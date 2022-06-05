import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { SpinnerComponent } from './spinner.component'

@NgModule({
  imports: [CommonModule, SvgIconModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})
export class SpinnerModule {}
