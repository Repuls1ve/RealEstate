import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxMaskModule } from 'ngx-mask'
import { ButtonModule } from '../controls/button/button.module'
import { SelectModule } from '../controls/select/select.module'
import { TextFieldModule } from '../controls/text-field/text-field.module'
import { SearchFormComponent } from './search-form.component'

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SelectModule,
    SvgIconModule,
    NgxMaskModule,
    TranslateModule,
    TextFieldModule,
    ReactiveFormsModule
  ],
  declarations: [SearchFormComponent],
  exports: [SearchFormComponent]
})
export class SearchFormModule {}