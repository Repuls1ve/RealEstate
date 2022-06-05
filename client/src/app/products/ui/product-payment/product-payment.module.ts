import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { ButtonModule } from '@shared/ui/button/button.module'
import { InputModule } from '@shared/ui/input/input.module'
import { ProductPaymentComponent } from './product-payment.component'

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    NgxChartsModule,
    TranslateModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [ProductPaymentComponent],
  exports: [ProductPaymentComponent]
})
export class ProductPaymentModule {}
