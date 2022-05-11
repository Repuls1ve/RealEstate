import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { StepComponent } from './step.component'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [StepComponent],
  exports: [StepComponent]
})
export class StepModule {}