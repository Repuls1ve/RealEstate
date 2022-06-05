import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { Product, ProductDetails } from '@shared/models/product.model'
import { ProductsService } from '@app/products/data-access/products.service'
import { RequestStatus, RequestStatusT } from '@shared/enums/request-status.enum'
import { RequestError } from '@shared/types/request-error.type'

export interface ProductDetailState {
  readonly product: Product | null
  readonly status: RequestStatusT
  readonly error: RequestError
}

@Injectable()
export class ProductDetailStore extends ComponentStore<ProductDetailState> {
  constructor(private readonly productsService: ProductsService, private readonly translate: TranslateService) {
    super({
      product: null,
      status: RequestStatus.Pending,
      error: null
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

  public readonly setProduct = this.updater((state, value: Product) => ({
    ...state,
    product: value
  }))

  public readonly error$ = this.select(state => state.error === RequestStatus.Error)

  public readonly loading$ = this.select(state => state.status === RequestStatus.Loading)

  public readonly product$ = this.select(state => state.product)

  public readonly vm$ = this.select(this.product$, this.loading$, this.error$, (product, loading, error) => ({
    product,
    loading,
    error
  }))

  public readonly fetchProduct = this.effect((uid$: Observable<ProductDetails['uid']>) =>
    uid$.pipe(
      tap(() => this.setStatus(RequestStatus.Loading)),
      switchMap(uid =>
        this.productsService.findOne(uid).pipe(
          tapResponse(
            translations => {
              this.setStatus(RequestStatus.Success)
              this.setError(null)
            },
            error => {
              this.setStatus(RequestStatus.Error)
              this.setError(error as RequestError)
            }
          ),
          catchError(() => EMPTY)
        )
      )
    )
  )
}
