import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { ProductListingModule } from 'src/app/products/ui/product-listing/product-listing.module'
import { SearchFormModule } from 'src/app/shared/ui/search-form/search-form.module'
import { HomeBenefitsModule } from '../ui/home-benefits/home-benefits.module'
import { HomeContactModule } from '../ui/home-contact/home-contact.module'
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