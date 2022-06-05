import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { Step, StepperStore } from './stepper.store'

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StepperStore]
})
export class StepperComponent {
  public readonly vm$ = this.stepperStore.vm$

  @Input()
  public set steps(value: Step[]) {
    this.stepperStore.setSteps(value)
    this.selectFirstStep()
  }

  @Output()
  public readonly stepChange = this.stepperStore.stepChange$

  constructor(private readonly stepperStore: StepperStore) {}

  public selectStep(id: Step['id']): void {
    this.stepperStore.selectStep(id)
  }

  public selectFirstStep(): void {
    this.stepperStore.selectFirstStep()
  }

  public selectLastStep(): void {
    this.stepperStore.selectLastStep()
  }

  public selectNextStep(): void {
    this.stepperStore.selectNextStep()
  }

  public selectPreviousStep(): void {
    this.stepperStore.selectPreviousStep()
  }

  public isStepActive(step: Step, active: Step['id']): boolean {
    return step.id === active
  }
}
