import { Injectable } from '@angular/core'
import { Categories, Category, Product, PropertyStatuses } from '@shared/models/product.model'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Error, Status } from '../product-listing/product-listing.store'
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { ProductsService } from '@app/products/data-access/products.service'
import { Period } from '@app/products/feature/product-catalog/product-catalog.store'
import { Language, Translatable } from '@core/i18n/i18n.types'
import { TranslateService } from '@ngx-translate/core'
import { ButtonThemes } from '@shared/ui/controls/button/button.component'

export interface ProductCategoriesState {
  readonly category: Extract<Category, 'any' | 'apartments' | 'townhouse' | 'condominium'>
  readonly quantity: number
  readonly status: Status
  readonly error: Error
  readonly translations: Translatable<Product>[] | null
  readonly products: Product[]
}

@Injectable()
export class ProductCategoriesStore extends ComponentStore<ProductCategoriesState> {
  constructor(private readonly productsService: ProductsService, private readonly translate: TranslateService) {
    super({
      category: Categories.Any,
      quantity: 8,
      error: null,
      status: Status.Pending,
      translations: null,
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

  public readonly setTranslations = this.updater((state, value: ProductCategoriesState['translations']) => ({
    ...state,
    translations: value
  }))

  public readonly setProducts = this.updater((state, value: ProductCategoriesState['products']) => ({
    ...state,
    products: value
  }))

  public readonly themes$ = this.select(state => ({
    [Categories.Any]: state.category === Categories.Any ? ButtonThemes.Contained : ButtonThemes.Outlined,
    [Categories.Apartments]: state.category === Categories.Apartments ? ButtonThemes.Contained : ButtonThemes.Outlined,
    [Categories.Condominium]:
      state.category === Categories.Condominium ? ButtonThemes.Contained : ButtonThemes.Outlined,
    [Categories.Townhouse]: state.category === Categories.Townhouse ? ButtonThemes.Contained : ButtonThemes.Outlined
  }))

  public readonly products$ = this.select(state => state.products)

  public readonly error$ = this.select(state => state.error)

  public readonly loading$ = this.select(state => state.status == Status.Loading)

  public readonly quantity$ = this.select(state => state.quantity)

  public readonly vm$ = this.select(
    this.themes$,
    this.products$,
    this.loading$,
    this.error$,
    this.quantity$,
    (themes, products, loading, error, quantity) => ({
      themes,
      products,
      loading,
      error,
      quantity
    })
  )

  public readonly updateLanguage = this.effect($ =>
    $.pipe(
      tap(() => {
        const translations = this.get().translations
        const language = this.translate.currentLang as Language

        if (translations) {
          this.setProducts(translations.map(translation => translation[language]))
        }
      })
    )
  )

  public readonly observeLanguageChange = this.effect($ =>
    $.pipe(switchMap(() => this.translate.onLangChange.pipe(tap(() => this.updateLanguage()))))
  )

  public readonly changeCategory = this.effect((category$: Observable<ProductCategoriesState['category']>) =>
    category$.pipe(
      tap(category => this.setCategory(category)),
      tap(() => this.setStatus(Status.Loading)),
      switchMap(category =>
        this.productsService
          .getProducts({
            category,
            limit: this.get().quantity,
            period: Period.Any,
            status: PropertyStatuses.Any,
            page: 1
          })
          .pipe(
            tapResponse(
              response => {
                this.setTranslations(response.data)
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
          )
      )
    )
  )
}
