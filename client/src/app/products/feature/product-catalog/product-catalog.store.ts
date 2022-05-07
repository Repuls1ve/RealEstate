import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { map, Observable, switchMap, tap } from 'rxjs'
import { Language, Translatable } from 'src/app/core/i18n/i18n.types'
import { PaginationMetaInfo, PaginationParams } from 'src/app/core/types/pagination.type'
import { Category, Product, PropertyStatus } from 'src/app/shared/models/product.model'
import { PageEvent } from 'src/app/shared/ui/paginator/paginator.store'
import { SearchFormParams } from 'src/app/shared/ui/search-form/search-form.component'
import { ProductsService } from '../../data-access/products.service'
import { Error, Status } from '../../ui/product-listing/product-listing.store'

export enum Period {
  Any = 'any'
}

export interface ProductCatalogParams extends PaginationParams {
  readonly priceMin?: number
  readonly priceMax?: number
  readonly status: PropertyStatus
  readonly period: Period | number
  readonly category: Category
}

export interface ProductCatalogState {
  readonly products: Product[]
  readonly translations: Translatable<Product>[] | null
  readonly params: ProductCatalogParams
  readonly status: Status
  readonly error: Error
  readonly meta: PaginationMetaInfo | null
}

@Injectable()
export class ProductCatalogStore extends ComponentStore<ProductCatalogState> {
  constructor(
    private readonly translate: TranslateService,
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super({
      products: [],
      translations: null,
      params: {
        status: PropertyStatus.Any,
        period: Period.Any,
        category: Category.Any,
        page: 1,
        limit: 8
      },
      status: Status.Pending,
      error: null,
      meta: null
    })
  }

  public readonly setError = this.updater((state, value: Error) => ({
    ...state,
    error: value
  }))

  public readonly setStatus = this.updater((state, value: Status) => ({
    ...state,
    status: value
  }))

  public readonly setProducts = this.updater((state, value: Product[]) => ({
    ...state,
    products: value
  }))

  public readonly setParams = this.updater((state, value: ProductCatalogParams) => ({
    ...state,
    params: value
  }))

  public readonly setTranslations = this.updater((state, value: Translatable<Product>[]) => ({
    ...state,
    translations: value
  }))

  public readonly setMeta = this.updater((state, value: PaginationMetaInfo) => ({
    ...state,
    meta: value
  }))

  public readonly error$ = this.select(state => state.error)

  public readonly status$ = this.select(state => state.status)

  public readonly loading$ = this.select(state => state.status == Status.Loading)

  public readonly products$ = this.select(state => state.products)

  public readonly meta$ = this.select(state => state.meta)

  public readonly pageIndex$ = this.select(state => {
    const page = state.params.page

    return page ? Number(page) - 1 : 0
  })

  public readonly vm$ = this.select(
    this.products$,
    this.pageIndex$,
    this.loading$,
    this.error$,
    this.meta$,
    (products, pageIndex, loading, error, meta) => ({
      products,
      pageIndex,
      loading,
      error,
      meta
    })
  )

  public readonly updateLanguage = this.effect($ => $.pipe(
    tap(() => {
      const translations = this.get().translations
      const language = this.translate.currentLang as Language

      if (translations) {
        this.setProducts(translations.map(translation => translation[language]))
      }
    })
  ))

  public readonly observeLanguageChange = this.effect($ => $.pipe(
    switchMap(() => this.translate.onLangChange.pipe(
      tap(() => this.updateLanguage())
    ))
  ))

  public readonly observeParamsChange = this.effect($ => $.pipe(
    switchMap(() => this.route.queryParams.pipe(
      tap(params => this.fetchProducts(params))
    ))
  ))

  public readonly onSearch = this.effect((params$: Observable<SearchFormParams>) => params$.pipe(
    map(params => ({
      priceMin: params.price.min ?? undefined,
      priceMax: params.price.max ?? undefined,
      status: params.status,
      period: params.period,
      category: params.category,
      page: 1
    })),
    tap(params => this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params
    }))
  ))

  public readonly changePage = this.effect((event$: Observable<PageEvent>) => event$.pipe(
    map(event => ({ page: ++event.pageIndex })),
    tap(params => this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    }))
  ))

  public readonly fetchProducts = this.effect((params$: Observable<Partial<ProductCatalogParams>>) => params$.pipe(
    map(params => ({
      ...params.priceMin && { priceMin: params.priceMin },
      ...params.priceMax && { priceMax: params.priceMax },
      status: params.status || PropertyStatus.Any,
      period: params.period || Period.Any,
      category: params.category || Category.Any,
      page: params.page || 1,
      limit: params.limit || 8
    })),
    tap(params => this.setParams(params)),
    tap(() => this.setStatus(Status.Loading)),
    switchMap(params => this.productsService.getProducts(params).pipe(
      tapResponse(
        result => {
          this.setMeta(result.meta)
          this.setTranslations(result.data)
          this.setStatus(Status.Success)
          this.setError(null)
          this.updateLanguage()
        },
        error => {
          this.setStatus(Status.Error)
          this.setError(error as Error)
        }
      )
    ))
  ))
}