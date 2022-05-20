import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { StepperComponent } from './stepper.component'

@NgModule({
  imports: [CommonModule, TranslateModule, ReactiveComponentModule],
  declarations: [StepperComponent],
  exports: [StepperComponent]
})
export class StepperModule {}
