import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FilesModule } from '@shared/ui/files/files.module'
import { InputFilesModule } from '@shared/ui/input-files/input-files.module'
import { NgSelectModule } from '@ng-select/ng-select'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from '@shared/ui/controls/button/button.module'
import { SelectModule } from '@shared/ui/controls/select/select.module'
import { TextAreaModule } from '@shared/ui/controls/text-area/text-area.module'
import { TextFieldModule } from '@shared/ui/controls/text-field/text-field.module'
import { StepperModule } from '@shared/ui/stepper/stepper.module'
import { NgxMaskModule } from 'ngx-mask'
import { ProductCreationFormComponent } from './product-creation-form.component'
import { ProductGeneralFormComponent } from './product-general-form/product-general-form.component'
import { ProductLocationFormComponent } from './product-location-form/product-location-form.component'
import { ProductTranslateFormComponent } from './product-translate-form/product-translate-form.component'

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    ButtonModule,
    FilesModule,
    StepperModule,
    NgxMaskModule,
    TextAreaModule,
    NgSelectModule,
    TranslateModule,
    TextFieldModule,
    InputFilesModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [
    ProductCreationFormComponent,
    ProductGeneralFormComponent,
    ProductTranslateFormComponent,
    ProductLocationFormComponent
  ],
  exports: [ProductCreationFormComponent]
})
export class ProductCreationFormModule {}
