import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TextAreaComponent } from './text-area.component'

@NgModule({
  imports: [CommonModule],
  declarations: [TextAreaComponent],
  exports: [TextAreaComponent]
})
export class TextAreaModule {}