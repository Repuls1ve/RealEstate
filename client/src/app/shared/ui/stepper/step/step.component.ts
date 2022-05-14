import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Step } from '../stepper.store'

@Component({
  selector: 'stepper-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent {
  @Input()
  public step!: Step

  @Output()
  public readonly stepChange = new EventEmitter<Step>()

  public onStepChange(): void {
    this.stepChange.emit(this.step)
  }
}
