import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { ProductListingModule } from '@app/products/ui/product-listing/product-listing.module'
import { SearchFormModule } from '@app/shared/ui/search-form/search-form.module'
import { HomeBenefitsModule } from '@app/home/ui/home-benefits/home-benefits.module'
import { HomeContactModule } from '@app/home/ui/home-contact/home-contact.module'
import { HomePageRoutingModule } from './home-routing.module'
import { HomePage } from './home.page'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SearchFormModule,
    HomeContactModule,
    HomeBenefitsModule,
    HomePageRoutingModule,
    ProductListingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}