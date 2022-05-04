import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { ProductInfoModule } from '../../ui/product-info/product-info.module'
import { ProductListingModule } from '../../ui/product-listing/product-listing.module'
import { ProductPaymentModule } from '../../ui/product-payment/product-payment.module'
import { ProductDetailPageRoutingModule } from './product-detail-routing.module'
import { ProductDetailPage } from './product-detail.page'

@NgModule({
  imports: [
    CommonModule,
    ProductInfoModule,
    ProductListingModule,
    ProductPaymentModule,
    ReactiveComponentModule,
    ProductDetailPageRoutingModule,
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}