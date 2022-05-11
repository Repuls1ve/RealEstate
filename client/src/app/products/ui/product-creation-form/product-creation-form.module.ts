import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from 'src/app/shared/ui/controls/button/button.module'
import { SelectModule } from 'src/app/shared/ui/controls/select/select.module'
import { TextAreaModule } from 'src/app/shared/ui/controls/text-area/text-area.module'
import { TextFieldModule } from 'src/app/shared/ui/controls/text-field/text-field.module'
import { StepperModule } from 'src/app/shared/ui/stepper/stepper.module'
import { ProductCreationFormComponent } from './product-creation-form.component'

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    ButtonModule,
    StepperModule,
    TextAreaModule,
    TranslateModule,
    TextFieldModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [ProductCreationFormComponent],
  exports: [ProductCreationFormComponent]
})
export class ProductCreationFormModule {}