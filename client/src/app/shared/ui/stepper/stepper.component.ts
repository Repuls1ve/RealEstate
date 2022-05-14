import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { Step, StepperStore } from './stepper.store'

@Component({
  selector: 'stepper',
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
  }

  @Output()
  public readonly stepsChange = this.stepperStore.stepsChange$

  constructor(private readonly stepperStore: StepperStore) {}

  public onStepChange(step: Step): void {
    this.stepperStore.onStepChange(step)
  }
}
