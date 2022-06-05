import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { map, Observable, switchMap, tap } from 'rxjs'
import { PageEvent } from '@shared/ui/paginator/paginator.store'
import { ProductsService } from '@app/products/data-access/products.service'
import { Product, ProductDetails } from '@shared/models/product.model'
import { PropertyStatus } from '@shared/enums/property-status.enum'
import { Category } from '@shared/enums/category.enum'
import { PaginationMetaInfo, PaginationParams } from '@shared/interfaces/pagination.interface'
import { RequestStatus, RequestStatusT } from '@shared/enums/request-status.enum'
import { RequestError } from '@shared/types/request-error.type'
import { Period, PeriodT } from '@shared/enums/period.enum'
import { ProductSearchEvent } from '@app/products/ui/product-search/product-search.component'

export interface ProductCatalogParams extends PaginationParams {
  readonly priceMin?: number
  readonly priceMax?: number
  readonly status: ProductDetails['status']
  readonly category: ProductDetails['category']
  readonly period: PeriodT
}

export interface ProductCatalogState {
  readonly products: Product[]
  readonly params: ProductCatalogParams
  readonly status: RequestStatusT
  readonly error: RequestError
  readonly meta: PaginationMetaInfo | null
}

@Injectable()
export class ProductCatalogStore extends ComponentStore<ProductCatalogState> {
  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super({
      products: [],
      params: {
        status: PropertyStatus.Sell,
        period: Period.AllTime,
        category: Category.Any,
        page: 1,
        limit: 8
      },
      status: RequestStatus.Pending,
      error: null,
      meta: null
    })
  }

  public readonly setError = this.updater((state, value: RequestError) => ({
    ...state,
    error: value
  }))

  public readonly setStatus = this.updater((state, value: RequestStatusT) => ({
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

  public readonly setMeta = this.updater((state, value: PaginationMetaInfo) => ({
    ...state,
    meta: value
  }))

  public readonly error$ = this.select(state => state.error)

  public readonly status$ = this.select(state => state.status)

  public readonly loading$ = this.select(state => state.status == RequestStatus.Loading)

  public readonly products$ = this.select(state => state.products)

  public readonly params$ = this.select(state => state.params)

  public readonly meta$ = this.select(state => state.meta)

  public readonly results$ = this.select(this.meta$, this.params$, (meta, params) => ({
    ...params,
    totalItems: meta?.totalItems ?? 0
  }))

  public readonly pageIndex$ = this.select(state => {
    const page = state.params.page

    return page ? Number(page) - 1 : 0
  })

  public readonly vm$ = this.select(
    this.products$,
    this.results$,
    this.pageIndex$,
    this.loading$,
    this.error$,
    this.meta$,
    (products, results, pageIndex, loading, error, meta) => ({
      products,
      results,
      pageIndex,
      loading,
      error,
      meta
    })
  )

  public readonly observeParamsChange = this.effect($ =>
    $.pipe(switchMap(() => this.route.queryParams.pipe(tap(params => this.fetchProducts(params)))))
  )

  public readonly onSearch = this.effect((params$: Observable<ProductSearchEvent>) =>
    params$.pipe(
      map(params => ({
        priceMin: params.price.min ?? undefined,
        priceMax: params.price.max ?? undefined,
        status: params.status,
        period: params.period,
        category: params.category,
        page: 1
      })),
      tap(params =>
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: params
        })
      )
    )
  )

  public readonly changePage = this.effect((event$: Observable<PageEvent>) =>
    event$.pipe(
      map(event => ({ page: ++event.pageIndex })),
      tap(params =>
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: params,
          queryParamsHandling: 'merge'
        })
      )
    )
  )

  public readonly fetchProducts = this.effect((params$: Observable<Partial<ProductCatalogParams>>) =>
    params$.pipe(
      map(params => ({
        ...(params.priceMin && { priceMin: params.priceMin }),
        ...(params.priceMax && { priceMax: params.priceMax }),
        status: params.status || PropertyStatus.Sell,
        period: params.period || Period.AllTime,
        category: params.category || Category.Any,
        page: params.page || 1,
        limit: params.limit || 8
      })),
      tap(params => this.setParams(params)),
      tap(() => this.setStatus(RequestStatus.Loading)),
      switchMap(params =>
        this.productsService.find(params).pipe(
          tapResponse(
            result => {
              this.setProducts(result.data)
              this.setMeta(result.meta)
              this.setStatus(RequestStatus.Success)
              this.setError(null)
            },
            error => {
              this.setStatus(RequestStatus.Error)
              this.setError(error as RequestError)
            }
          )
        )
      )
    )
  )
}
