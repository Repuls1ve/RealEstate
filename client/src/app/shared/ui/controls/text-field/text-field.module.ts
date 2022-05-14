import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TextFieldComponent } from './text-field.component'

@NgModule({
  imports: [CommonModule],
  declarations: [TextFieldComponent],
  exports: [TextFieldComponent]
})
export class TextFieldModule {}
