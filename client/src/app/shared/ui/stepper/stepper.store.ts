import { EventEmitter, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, tap } from 'rxjs'

export interface Step {
  readonly id: number
  readonly label: string
  readonly isActive: boolean
}

export interface StepperState {
  readonly steps: Step[]
}

@Injectable()
export class StepperStore extends ComponentStore<StepperState> {
  constructor() {
    super({
      steps: []
    })
  }

  public readonly stepsChange$ = new EventEmitter<Step[]>()

  public readonly setSteps = this.updater((state, value: Step[]) => ({
    ...state,
    steps: value
  }))

  public readonly vm$ = this.select(store => store)

  public readonly changeSteps = this.effect((steps$: Observable<Step[]>) =>
    steps$.pipe(
      tap(steps => this.setSteps(steps)),
      tap(steps => this.stepsChange$.emit(steps))
    )
  )

  public readonly onStepChange = this.effect((step$: Observable<Step>) =>
    step$.pipe(
      map(step =>
        this.get().steps.map(target =>
          target.id == step.id ? { ...step, isActive: true } : { ...target, isActive: false }
        )
      ),
      tap(steps => this.setSteps(steps)),
      tap(steps => this.stepsChange$.emit(steps))
    )
  )
}
