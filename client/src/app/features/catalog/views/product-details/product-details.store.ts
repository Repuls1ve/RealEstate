import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { ProductsService } from 'src/app/core/services/products/products.service'
import { Error, Status } from 'src/app/shared/components/newest-listings/newest-listings.store'
import { Product, ProductDetails } from 'src/app/shared/models/product.model'

export interface ProductDetailsState {
  product: Product | null
  status: Status
  error: Error
}

@Injectable()
export class ProductDetailsStore extends ComponentStore<ProductDetailsState> {
  constructor(private readonly productsService: ProductsService) {
    super({
      product: null,
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

  public readonly setProduct = this.updater((state, value: Product) => ({
    ...state,
    product: value
  }))

  public readonly error$ = this.select(state => state.error == Status.Error)

  public readonly loading$ = this.select(state => state.status == Status.Loading)

  public readonly product$ = this.select(state => state.product)

  public readonly vm$ = this.select(
    this.product$,
    this.loading$,
    this.error$,
    (product, loading, error) => ({
      product,
      loading,
      error
    })
  )

  public readonly fetchProduct = this.effect((id$: Observable<ProductDetails['id']>) => id$.pipe(
    tap(() => this.setStatus(Status.Loading)),
    switchMap(id => this.productsService.getProduct(id).pipe(
      tapResponse(
        product => {
          this.setProduct(product)
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