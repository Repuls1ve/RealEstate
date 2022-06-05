import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FilesModule } from '@shared/ui/files/files.module'
import { InputFilesModule } from '@shared/ui/input-files/input-files.module'
import { NgSelectModule } from '@ng-select/ng-select'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from '@shared/ui/button/button.module'
import { TextAreaModule } from '@shared/ui/text-area/text-area.module'
import { InputModule } from '@shared/ui/input/input.module'
import { StepperModule } from '@shared/ui/stepper/stepper.module'
import { NgxMaskModule } from 'ngx-mask'
import { ProductCreationFormComponent } from './product-creation-form.component'
import { ProductGeneralFormComponent } from './product-general-form/product-general-form.component'
import { ProductLocationFormComponent } from './product-location-form/product-location-form.component'

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FilesModule,
    StepperModule,
    NgxMaskModule,
    TextAreaModule,
    NgSelectModule,
    TranslateModule,
    InputModule,
    InputFilesModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [ProductCreationFormComponent, ProductGeneralFormComponent, ProductLocationFormComponent],
  exports: [ProductCreationFormComponent]
})
export class ProductCreationFormModule {}
