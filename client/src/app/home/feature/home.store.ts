import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ComponentStore } from '@ngrx/component-store'
import { ProductSearchEvent } from '@app/products/ui/product-search/product-search.component'
import { map, Observable, tap } from 'rxjs'
import { Review } from '../ui/home-reviews/home-reviews.store'
import { HOME_REVIEWS } from '@shared/constants/reviews'

export interface HomeState {
  /**
   * Reviews to display in reviews section
   */
  readonly reviews: Review[]

  /**
   * Number of nevelties to display in nevelties section
   */
  readonly nevelties: number

  /**
   * Number of products to display in categories section
   */
  readonly products: number
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  constructor(private readonly router: Router) {
    super({
      reviews: HOME_REVIEWS,
      nevelties: 4,
      products: 8
    })
  }

  public readonly setReviews = this.updater((state, value: HomeState['reviews']) => ({
    ...state,
    reviews: value
  }))

  public readonly setNevelties = this.updater((state, value: HomeState['nevelties']) => ({
    ...state,
    nevelties: value
  }))

  public readonly setProducts = this.updater((state, value: HomeState['products']) => ({
    ...state,
    products: value
  }))

  public readonly vm$ = this.select(state => state)

  public readonly onSearch = this.effect((event$: Observable<ProductSearchEvent>) =>
    event$.pipe(
      map(({ price, status, period, category }) => ({
        priceMin: price.min ?? undefined,
        priceMax: price.max ?? undefined,
        page: 1,
        status,
        period,
        category
      })),
      tap(queryParams => this.router.navigate(['/catalog'], { queryParams }))
    )
  )
}
