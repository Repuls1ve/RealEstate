import { EventEmitter, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, tap } from 'rxjs'
import { Period } from 'src/app/products/feature/product-catalog/product-catalog.store'
import { Category, PropertyStatus, PropertyStatuses } from '../../models/product.model'
import { ButtonTheme, ButtonThemes } from '../controls/button/button.component'

export type SearchFormStatus = Exclude<PropertyStatus, 'any'>

export type SearchFormStatuses = Exclude<PropertyStatuses, PropertyStatuses.Any>

export interface SearchFormValues {
  readonly period: Period | string
  readonly category: Category
  readonly price: Record<'min' | 'max', string | null>
}

export interface SearchFormParams extends Pick<SearchFormValues, 'category'> {
  readonly status: SearchFormStatus
  readonly period: Period | number
  readonly price: Record<'min' | 'max', number | null>
}

export interface SearchFormState {
  readonly status: SearchFormStatus
  readonly theme: Record<SearchFormStatus, ButtonTheme>
}

@Injectable()
export class SearchFormStore extends ComponentStore<SearchFormState> {
  constructor() {
    super({
      status: PropertyStatuses.Sell,
      theme: {
        sell: ButtonThemes.Contained,
        rent: ButtonThemes.Outlined
      }
    })
  }

  public readonly search$ = new EventEmitter<SearchFormParams>()

  public readonly setStatus = this.updater((state, value: SearchFormStatus) => ({
    ...state,
    status: value
  }))

  public readonly setTheme = this.updater((state, value: Record<SearchFormStatus, ButtonTheme>) => ({
    ...state,
    theme: value
  }))

  public readonly theme$ = this.select(state => state.theme)

  public readonly vm$ = this.select(
    this.theme$,
    theme => ({
      theme
    })
  )
  
  public readonly changeStatus = this.effect((selected$: Observable<SearchFormStatus>) => selected$.pipe(
    tap(selected => this.setStatus(selected)),
    tap(selected => this.setTheme({
      sell: selected == PropertyStatuses.Sell ? ButtonThemes.Contained : ButtonThemes.Outlined,
      rent: selected == PropertyStatuses.Rent ? ButtonThemes.Contained : ButtonThemes.Outlined
    }))
  ))

  public readonly onSubmit = this.effect((values$: Observable<SearchFormValues>) => values$.pipe(
    map(values => ({
      ...values,
      status: this.get().status,
      period: values.period == Period.Any ? values.period : Number(values.period),
      price: {
        min: values.price.min ? Number(values.price.min) : null,
        max: values.price.max ? Number(values.price.max) : null
      }
    })),
    tap(params => this.search$.emit(params))
  ))
}