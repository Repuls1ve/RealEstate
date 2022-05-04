import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { ProductsService } from '../../data-access/products.service'
import { Product } from 'src/app/shared/models/product.model'
import { Language, Translatable } from 'src/app/core/i18n/i18n.types'
import { TranslateService } from '@ngx-translate/core'

export type Error = string | null

export enum Status {
  Pending = 'pending',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export interface ProductListingState {
  quantity: number
  products: Product[]
  translations: Translatable<Product>[] | null
  status: Status
  error: Error
}

@Injectable()
export class ProductListingStore extends ComponentStore<ProductListingState> {
  constructor(
    private readonly productsService: ProductsService,
    private readonly translate: TranslateService
  ) {
    super({
      quantity: 0,
      products: [],
      status: Status.Pending,
      translations: null,
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

  public readonly setTranslations = this.updater((state, value: Translatable<Product>[]) => ({
    ...state,
    translations: value
  }))

  public readonly setQuantity = this.updater((state, value: number) => ({
    ...state,
    quantity: value
  }))

  public readonly error$ = this.select(state => state.error)

  public readonly status$ = this.select(state => state.status)

  public readonly loading$ = this.select(state => state.status == Status.Loading)

  public readonly products$ = this.select(state => state.products)

  public readonly quantity$ = this.select(state => state.quantity)

  public readonly vm$ = this.select(
    this.quantity$,
    this.products$,
    this.loading$,
    this.error$,
    (quantity, products, loading, error) => ({
      quantity,
      products,
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

  public readonly fetchProducts = this.effect((quantity$: Observable<number>) => quantity$.pipe(
    tap(quantity => this.setQuantity(quantity)),
    tap(() => this.setStatus(Status.Loading)),
    switchMap(quantity => this.productsService.getNewestProducts(quantity).pipe(
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
      ),
      catchError(() => EMPTY)
    ))
  ))
}