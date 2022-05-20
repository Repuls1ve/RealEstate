import { EventEmitter, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { filter, map, Observable, tap } from 'rxjs'
import { Step, StepEvent } from '@shared/ui/stepper/stepper.store'

export type TranslatableField =
  | 'title'
  | 'description'
  | 'size'
  | 'position'
  | 'city'
  | 'state'
  | 'area'
  | 'country'
  | 'overview'

export interface ProductCreationFormValues {
  readonly uid: string
  readonly title: string
  readonly description: string
  readonly price: string
  readonly size: string
  readonly year: string
  readonly overview: string[]
  readonly category: string
  readonly status: string
  readonly position: string
  readonly city: string
  readonly state: string
  readonly zip: string
  readonly area: string
  readonly country: string
  readonly agency: string
  readonly translation: Pick<ProductCreationFormValues, TranslatableField>
}

export interface ProductCreationFormParams extends Omit<ProductCreationFormValues, 'price' | 'year'> {
  readonly price: number
  readonly year: number
}

export interface ProductCreationFormState {
  readonly steps: Step[]
  readonly active: Step['id']
}

@Injectable()
export class ProductCreationFormStore extends ComponentStore<ProductCreationFormState> {
  constructor() {
    super({
      steps: [],
      active: NaN
    })
  }

  public readonly create$ = new EventEmitter<ProductCreationFormParams>()

  public readonly setSteps = this.updater((state, value: Step[]) => ({
    ...state,
    steps: value
  }))

  public readonly setActive = this.updater((state, value: Step['id']) => ({
    ...state,
    active: value
  }))

  public readonly steps$ = this.select(state => state.steps)

  public readonly stepId$ = this.select(state => state.active)

  public readonly vm$ = this.select(this.steps$, this.stepId$, (steps, stepId) => ({
    steps,
    stepId
  }))

  public readonly onStepChange = this.effect((event$: Observable<StepEvent>) =>
    event$.pipe(tap(event => this.setActive(event.active)))
  )

  public readonly onSubmit = this.effect((values$: Observable<ProductCreationFormValues>) =>
    values$.pipe(
      map(values => ({
        ...values,
        price: Number(values.price),
        year: Number(values.year)
      })),
      tap(params => this.create$.emit(params))
    )
  )
}
