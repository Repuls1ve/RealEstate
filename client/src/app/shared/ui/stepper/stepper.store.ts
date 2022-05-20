import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { filter, map, Observable, pairwise, tap } from 'rxjs'

export interface Step {
  /**
   * Used in order to identify the step. Must be unique
   */
  readonly id: number

  /**
   * Used to define a caption for the step
   */
  readonly label: string
}

export interface StepperState {
  /**
   * List of available steps
   */
  readonly steps: Step[]

  /**
   * The current step id. Gets NaN if steps are not provided
   */
  readonly active: Step['id']
}

/**
 * Change event object that is emitted when the user selects an another step
 */
export interface StepEvent extends StepperState {
  /**
   * Id of the previous step
   */
  readonly previous?: Step['id']
}

@Injectable()
export class StepperStore extends ComponentStore<StepperState> {
  constructor() {
    super({
      steps: [],
      active: NaN
    })
  }

  public readonly setSteps = this.updater((state, value: Step[]) => ({
    ...state,
    active: value.length ? state.active : NaN,
    steps: value
  }))

  public readonly setActive = this.updater((state, value: Step['id']) => ({
    ...state,
    active: value
  }))

  public readonly previous$ = this.state$.pipe(
    pairwise(),
    map(([previous]) => (isNaN(previous.active) ? undefined : previous.active))
  )

  public readonly active$ = this.select(state => state.steps.find(step => step.id === state.active)!)

  public readonly stepChange$ = this.select(
    this.previous$,
    this.state$,
    (previous, state) => ({
      previous,
      ...state
    }),
    { debounce: true }
  )

  public readonly vm$ = this.select(store => store)

  public readonly selectStep = this.effect((id$: Observable<Step['id']>) =>
    id$.pipe(
      filter(id =>
        this.get()
          .steps.map(step => step.id)
          .includes(id)
      ),
      tap(id => this.setActive(id))
    )
  )

  public readonly selectFirstStep = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().steps.length > 0),
      tap(() => this.selectStep(this.get().steps[0].id))
    )
  )

  public readonly selectLastStep = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().steps.length > 0),
      tap(() => this.selectStep(this.get().steps.slice(-1)[0].id))
    )
  )

  public readonly selectNextStep = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().steps.length > 1),
      filter(() => !isNaN(this.get().active)),
      tap(() => {
        const { steps, active: activeId } = this.get()

        const activeIndex = steps.findIndex(step => step.id == activeId)
        const isLastActive = activeIndex == steps.length - 1

        if (isLastActive) {
          return this.selectFirstStep()
        }

        this.selectStep(steps[activeIndex + 1].id)
      })
    )
  )

  public readonly selectPreviousStep = this.effect(source$ =>
    source$.pipe(
      filter(() => this.get().steps.length > 1),
      filter(() => !isNaN(this.get().active)),
      tap(() => {
        const { steps, active: activeId } = this.get()

        const activeIndex = steps.findIndex(step => step.id == activeId)
        const isFirstActive = activeIndex == 0

        if (isFirstActive) {
          return this.selectLastStep()
        }

        this.selectStep(steps[activeIndex - 1].id)
      })
    )
  )
}
