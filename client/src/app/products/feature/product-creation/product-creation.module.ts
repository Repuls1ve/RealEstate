import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { ProductCreationFormModule } from '@app/products/ui/product-creation-form/product-creation-form.module'
import { ProductCreationRoutingModule } from './product-creation-routing.module'
import { ProductCreationPage } from './product-creation.page'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveComponentModule,
    ProductCreationFormModule,
    ProductCreationRoutingModule
  ],
  declarations: [ProductCreationPage]
})
export class ProductCreationPageModule {}
