import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { StepComponent } from './step/step.component'
import { StepperComponent } from './stepper.component'

@NgModule({
  imports: [CommonModule, ReactiveComponentModule],
  declarations: [StepperComponent, StepComponent],
  exports: [StepperComponent]
})
export class StepperModule {}
