import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { ProductsService } from 'src/app/core/services/products/products.service'
import { Product } from '../../models/product.model'

export type Error = string | null

export enum Status {
  Pending = 'pending',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export interface NewestListingsState {
  quantity: number
  products: Product[]
  status: Status
  error: Error
}

@Injectable()
export class NewestListingsStore extends ComponentStore<NewestListingsState> {
  constructor(private readonly productsService: ProductsService) {
    super({
      quantity: 0,
      products: [],
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

  public readonly setListings = this.updater((state, value: Product[]) => ({
    ...state,
    products: value
  }))

  public readonly setQuantity = this.updater((state, value: number) => ({
    ...state,
    quantity: value
  }))

  public readonly error$ = this.select(state => state.error)

  public readonly status$ = this.select(state => state.status)

  public readonly loading$ = this.select(state => state.status == Status.Loading)

  public readonly listings$ = this.select(state => state.products)

  public readonly quantity$ = this.select(state => state.quantity)

  public readonly vm$ = this.select(
    this.quantity$,
    this.listings$,
    this.loading$,
    this.error$,
    (quantity, listings, loading, error) => ({
      quantity,
      listings,
      loading,
      error
    })
  )

  public readonly fetchListings = this.effect((quantity$: Observable<number>) => quantity$.pipe(
    tap(quantity => this.setQuantity(quantity)),
    tap(() => this.setStatus(Status.Loading)),
    switchMap(quantity => this.productsService.getNewestListings(quantity).pipe(
      tapResponse(
        listings => {
          this.setListings(listings)
          this.setStatus(Status.Success)
          this.setError(null)
        },
        error => {
          this.setStatus(Status.Error)
          this.setError(error as Error)
        }
      ),
      catchError(() => EMPTY)
    ))
  ))
}