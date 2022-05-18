import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { filter, Observable, tap } from 'rxjs'

export interface Review {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly author: string
  readonly rating: number
}

export interface HomeReviewsState {
  readonly reviews: Review[]
  readonly active: Review['id']
}

@Injectable()
export class HomeReviewsStore extends ComponentStore<HomeReviewsState> {
  constructor() {
    super({
      reviews: [],
      active: NaN
    })
  }

  public readonly setReviews = this.updater((state, value: Review[]) => ({
    ...state,
    reviews: value
  }))

  public readonly setActive = this.updater((state, value: Review['id']) => ({
    ...state,
    active: value
  }))

  public readonly active$ = this.select(state => state.reviews.find(review => review.id == state.active)!)

  public readonly vm$ = this.select(this.active$, active => ({
    review: active
  }))

  public readonly selectFirstReview = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().reviews.length > 0),
      tap(() => this.selectReview(this.get().reviews[0].id))
    )
  )

  public readonly selectLastReview = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().reviews.length > 0),
      tap(() => this.selectReview(this.get().reviews.slice(-1)[0].id))
    )
  )

  public readonly selectReview = this.effect((id$: Observable<Review['id']>) =>
    id$.pipe(
      filter(id =>
        this.get()
          .reviews.map(review => review.id)
          .includes(id)
      ),
      tap(id => this.setActive(id))
    )
  )

  public readonly nextReview = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().reviews.length > 1),
      filter(() => !isNaN(this.get().active)),
      tap(() => {
        const { reviews, active: activeId } = this.get()

        const activeIndex = reviews.findIndex(review => review.id == activeId)
        const isLastActive = activeIndex == reviews.length - 1

        if (isLastActive) {
          return this.selectFirstReview()
        }

        this.selectReview(reviews[activeIndex + 1].id)
      })
    )
  )

  public readonly previousReview = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().reviews.length > 1),
      filter(() => !isNaN(this.get().active)),
      tap(() => {
        const { reviews, active: activeId } = this.get()

        const activeIndex = reviews.findIndex(review => review.id == activeId)
        const isFirstActive = activeIndex == 0

        if (isFirstActive) {
          return this.selectLastReview()
        }

        this.selectReview(reviews[activeIndex - 1].id)
      })
    )
  )
}
