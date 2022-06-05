import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { ProductsService } from '@app/products/data-access/products.service'
import { Category, CategoryT } from '@shared/enums/category.enum'
import { RequestStatus, RequestStatusT } from '@shared/enums/request-status.enum'
import { RequestError } from '@shared/types/request-error.type'
import { Product } from '@shared/models/product.model'
import { Period } from '@shared/enums/period.enum'
import { PropertyStatus } from '@shared/enums/property-status.enum'
import { ButtonAppearance } from '@shared/enums/button-appearance.enum'

export interface ProductCategoriesState {
  readonly category: CategoryT
  readonly quantity: number
  readonly status: RequestStatusT
  readonly error: RequestError
  readonly products: Product[]
}

@Injectable()
export class ProductCategoriesStore extends ComponentStore<ProductCategoriesState> {
  constructor(private readonly productsService: ProductsService) {
    super({
      category: Category.Any,
      quantity: 8,
      error: null,
      status: RequestStatus.Pending,
      products: []
    })
  }

  public readonly setQuantity = this.updater((state, value: ProductCategoriesState['quantity']) => ({
    ...state,
    quantity: value
  }))

  public readonly setStatus = this.updater((state, value: ProductCategoriesState['status']) => ({
    ...state,
    status: value
  }))

  public readonly setError = this.updater((state, value: ProductCategoriesState['error']) => ({
    ...state,
    error: value
  }))

  public readonly setCategory = this.updater((state, value: ProductCategoriesState['category']) => ({
    ...state,
    category: value
  }))

  public readonly setProducts = this.updater((state, value: ProductCategoriesState['products']) => ({
    ...state,
    products: value
  }))

  public readonly appearance$ = this.select(state => ({
    [Category.Any]: state.category === Category.Any ? ButtonAppearance.Contained : ButtonAppearance.Outlined,
    [Category.Apartments]:
      state.category === Category.Apartments ? ButtonAppearance.Contained : ButtonAppearance.Outlined,
    [Category.Condominium]:
      state.category === Category.Condominium ? ButtonAppearance.Contained : ButtonAppearance.Outlined,
    [Category.Townhouse]: state.category === Category.Townhouse ? ButtonAppearance.Contained : ButtonAppearance.Outlined
  }))

  public readonly products$ = this.select(state => state.products)

  public readonly error$ = this.select(state => state.error)

  public readonly loading$ = this.select(state => state.status == RequestStatus.Loading)

  public readonly quantity$ = this.select(state => state.quantity)

  public readonly vm$ = this.select(
    this.appearance$,
    this.products$,
    this.loading$,
    this.error$,
    this.quantity$,
    (appearance, products, loading, error, quantity) => ({
      appearance,
      products,
      loading,
      error,
      quantity
    })
  )

  public readonly changeCategory = this.effect((category$: Observable<ProductCategoriesState['category']>) =>
    category$.pipe(
      tap(category => this.setCategory(category)),
      tap(() => this.setStatus(RequestStatus.Loading)),
      switchMap(category =>
        this.productsService
          .find({
            category,
            limit: this.get().quantity,
            period: Period.AllTime,
            status: PropertyStatus.Sell,
            page: 1
          })
          .pipe(
            tapResponse(
              result => {
                this.setProducts(result.data)
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
