import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { Category, CategoryT } from '@shared/enums/category.enum'
import { Period, PeriodT } from '@shared/enums/period.enum'
import { PropertyStatus, PropertyStatusT } from '@shared/enums/property-status.enum'
import { PaginationMetaInfo } from '@shared/interfaces/pagination.interface'
import { Product } from '@shared/models/product.model'
import { switchMap } from 'rxjs'

export interface ProductResultsMeta extends Pick<PaginationMetaInfo, 'totalItems'> {
  readonly category: CategoryT
  readonly status: PropertyStatusT
  readonly period: PeriodT
  readonly priceMin?: number
  readonly priceMax?: number
}

export interface ProductResultsState {
  readonly meta: ProductResultsMeta
  readonly limit: PaginationMetaInfo['limit']
  readonly products: Product[]
  readonly loading: boolean
}

@Injectable()
export class ProductResultsStore extends ComponentStore<ProductResultsState> {
  constructor(private readonly translate: TranslateService) {
    super({
      meta: {
        category: Category.Any,
        status: PropertyStatus.Sell,
        period: Period.AllTime,
        totalItems: 1
      },
      products: [],
      limit: 8,
      loading: true
    })
  }

  public readonly setMeta = this.updater((state, value: ProductResultsMeta) => ({
    ...state,
    meta: value
  }))

  public readonly setProducts = this.updater((state, value: ProductResultsState['products']) => ({
    ...state,
    products: value
  }))

  public readonly setLimit = this.updater((state, value: ProductResultsState['limit']) => ({
    ...state,
    limit: value
  }))

  public readonly setLoading = this.updater((state, value: ProductResultsState['loading']) => ({
    ...state,
    loading: value
  }))

  public readonly status$ = this.state$.pipe(
    switchMap(state => this.translate.stream(`components.product-results.overview.statuses.${state.meta.status}`))
  )

  public readonly category$ = this.state$.pipe(
    switchMap(state => this.translate.stream(`components.product-results.overview.categories.${state.meta.category}`))
  )

  public readonly restrictions$ = this.select(state => state.meta.priceMin || state.meta.priceMax)

  public readonly price$ = this.select(state => ({
    priceMin: state.meta.priceMin,
    priceMax: state.meta.priceMax
  }))

  public readonly results$ = this.select(this.category$, this.status$, (category, status) => ({
    category,
    status
  }))

  public readonly count$ = this.select(state => ({
    displayed: state.products.length,
    total: state.meta.totalItems
  }))

  public readonly period$ = this.select(state => ({
    period: state.meta.period
  }))

  public readonly periodSpecified$ = this.select(state => state.meta.period !== Period.AllTime)

  public readonly vm$ = this.select(
    this.restrictions$,
    this.price$,
    this.results$,
    this.count$,
    this.periodSpecified$,
    this.period$,
    this.state$,
    (restrictions, price, results, count, periodSpecified, period, state) => ({
      ...state,
      price,
      results,
      count,
      restrictions,
      periodSpecified,
      period
    })
  )
}
