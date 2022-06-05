import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { ProductsService } from '@app/products/data-access/products.service'
import { Product } from '@shared/models/product.model'
import { RequestStatus, RequestStatusT } from '@shared/enums/request-status.enum'
import { RequestError } from '@shared/types/request-error.type'

export interface ProductNeveltiesState {
  /**
   * Number of nevelties to receive
   */
  readonly quantity: number

  /**
   * Nevelties themselves
   */
  readonly nevelties: Product[]

  /**
   * Status of the request for getting nevelties
   */
  readonly status: RequestStatusT

  /**
   * Error message if the request to get nevelties failed
   */
  readonly error: RequestError
}

@Injectable()
export class ProductNeveltiesStore extends ComponentStore<ProductNeveltiesState> {
  constructor(private readonly productsService: ProductsService) {
    super({
      quantity: 0,
      nevelties: [],
      status: RequestStatus.Pending,
      error: null
    })
  }

  public readonly setError = this.updater((state, value: ProductNeveltiesState['error']) => ({
    ...state,
    error: value
  }))

  public readonly setStatus = this.updater((state, value: ProductNeveltiesState['status']) => ({
    ...state,
    status: value
  }))

  public readonly setNevelties = this.updater((state, value: ProductNeveltiesState['nevelties']) => ({
    ...state,
    nevelties: value
  }))

  public readonly setQuantity = this.updater((state, value: ProductNeveltiesState['quantity']) => ({
    ...state,
    quantity: value
  }))

  public readonly loading$ = this.select(state => state.status == RequestStatus.Loading)

  public readonly vm$ = this.select(this.state$, this.loading$, (state, loading) => ({
    ...state,
    loading
  }))

  public readonly fetchNevelties = this.effect((quantity$: Observable<number>) =>
    quantity$.pipe(
      tap(quantity => this.setQuantity(quantity)),
      tap(() => this.setStatus(RequestStatus.Loading)),
      switchMap(quantity =>
        this.productsService.findNevelties(quantity).pipe(
          tapResponse(
            products => {
              this.setNevelties(products)
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
