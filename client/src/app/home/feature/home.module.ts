import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { ProductNeveltiesModule } from '@app/products/ui/product-nevelties/product-nevelties.module'
import { HomeBenefitsModule } from '@app/home/ui/home-benefits/home-benefits.module'
import { HomeContactModule } from '@app/home/ui/home-contact/home-contact.module'
import { HomePageRoutingModule } from './home-routing.module'
import { HomePageComponent } from './home.page'
import { ProductCategoriesModule } from '@app/products/ui/product-categories/product-categories.module'
import { HomeReviewsModule } from '../ui/home-reviews/home-reviews.module'
import { ProductSearchModule } from '@app/products/ui/product-search/product-search.module'
import { OverviewModule } from '@shared/ui/overview/overview.module'
import { ReactiveComponentModule } from '@ngrx/component'

@NgModule({
  imports: [
    CommonModule,
    OverviewModule,
    TranslateModule,
    HomeReviewsModule,
    HomeContactModule,
    HomeBenefitsModule,
    ProductSearchModule,
    ProductCategoriesModule,
    HomePageRoutingModule,
    ProductNeveltiesModule,
    ReactiveComponentModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule {}
