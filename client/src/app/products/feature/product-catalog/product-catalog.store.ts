import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { Observable, switchMap, tap } from 'rxjs'
import { Language, Translatable } from 'src/app/core/i18n/i18n.types'
import { Product } from 'src/app/shared/models/product.model'
import { ProductsService } from '../../data-access/products.service'
import { Error, Status } from '../../ui/product-listing/product-listing.store'

export interface ProductCatalogParams {
  priceMin?: string
  priceMax?: string
  page: string
  status: string
  period: string
  type: string
}

export interface ProductCatalogState {
  products: Product[]
  translations: Translatable<Product>[] | null
  params: Partial<ProductCatalogParams>
  status: Status
  error: Error
}

@Injectable()
export class ProductCatalogStore extends ComponentStore<ProductCatalogState> {
  constructor(
    private readonly translate: TranslateService,
    private readonly productsService: ProductsService
  ) {
    super({
      products: [],
      translations: null,
      params: {},
      status: Status.Pending,
      error: null
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

  public readonly setParams = this.updater((state, value: Partial<ProductCatalogParams>) => ({
    ...state,
    params: value
  }))

  public readonly setTranslations = this.updater((state, value: Translatable<Product>[]) => ({
    ...state,
    translations: value
  }))

  public readonly setPage = this.updater((state, value: ProductCatalogParams['page']) => ({
    ...state,
    params: {
      ...state.params,
      page: value
    }
  }))

  public readonly error$ = this.select(state => state.error)

  public readonly status$ = this.select(state => state.status)

  public readonly loading$ = this.select(state => state.status == Status.Loading)

  public readonly products$ = this.select(state => state.products)

  public readonly pageIndex$ = this.select(state => {
    const page = state.params.page

    return page ? Number(page) - 1 : 0
  })

  public readonly vm$ = this.select(
    this.products$,
    this.pageIndex$,
    this.loading$,
    this.error$,
    (products, pageIndex, loading, error) => ({
      products,
      pageIndex,
      loading,
      error
    })
  )

  public readonly subscribeTo = this.effect<unknown>($ => $)

  public readonly updateLanguage = this.effect($ => $.pipe(
    tap(() => {
      const translations = this.get().translations
      const language = this.translate.currentLang as Language

      if (translations) {
        this.setProducts(translations.map(translation => translation[language]))
      }
    })
  ))

  public readonly fetchProducts = this.effect((params$: Observable<Partial<ProductCatalogParams>>) => params$.pipe(
    tap(params => this.setParams(params)),
    tap(() => this.setStatus(Status.Loading)),
    switchMap(params => this.productsService.getNewestProducts(8).pipe(
      tapResponse(
        translations => {
          this.setTranslations(translations)
          this.updateLanguage()
          this.setStatus(Status.Success)
          this.setError(null)
        },
        error => {
          this.setStatus(Status.Error)
          this.setError(error as Error)
        }
      )
    ))
  ))
}