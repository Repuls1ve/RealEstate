import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { StepModule } from './step/step.module'
import { StepperComponent } from './stepper.component'

@NgModule({
  imports: [CommonModule, StepModule, ReactiveComponentModule],
  declarations: [StepperComponent],
  exports: [StepperComponent]
})
export class StepperModule {}
