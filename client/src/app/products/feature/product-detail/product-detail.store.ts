import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { Language, Translatable } from 'src/app/core/i18n/i18n.types'
import { Product, ProductDetails } from 'src/app/shared/models/product.model'
import { ProductsService } from '../../data-access/products.service'
import { Status, Error } from '../../ui/product-listing/product-listing.store'

export interface ProductDetailState {
  product: Product | null
  translations: Translatable<Product> | null
  status: Status
  error: Error
}

@Injectable()
export class ProductDetailStore extends ComponentStore<ProductDetailState> {
  constructor(
    private readonly productsService: ProductsService,
    private readonly translate: TranslateService
  ) {
    super({
      product: null,
      translations: null,
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

  public readonly setTranslations = this.updater((state, value: Translatable<Product>) => ({
    ...state,
    translations: value
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

  public readonly subscribeTo = this.effect<unknown>($ => $)

  public readonly updateLanguage = this.effect($ => $.pipe(
    tap(() => {
      const translations = this.get().translations
      const language = this.translate.currentLang as Language

      if (translations) {
        this.setProduct(translations[language])
      }
    })
  ))

  public readonly fetchProduct = this.effect((uid$: Observable<ProductDetails['uid']>) => uid$.pipe(
    tap(() => this.setStatus(Status.Loading)),
    switchMap(uid => this.productsService.getProduct(uid).pipe(
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