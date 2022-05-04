import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { ButtonModule } from 'src/app/shared/ui/controls/button/button.module'
import { TextFieldModule } from 'src/app/shared/ui/controls/text-field/text-field.module'
import { ProductPaymentComponent } from './product-payment.component'

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TextFieldModule,
    NgxChartsModule,
    TranslateModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [ProductPaymentComponent],
  exports: [ProductPaymentComponent]
})
export class ProductPaymentModule {}