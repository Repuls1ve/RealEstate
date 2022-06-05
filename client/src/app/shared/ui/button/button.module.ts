import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SpinnerModule } from '../spinner/spinner.module'
import { ButtonComponent } from './button.component'

@NgModule({
  imports: [CommonModule, SpinnerModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonModule {}
