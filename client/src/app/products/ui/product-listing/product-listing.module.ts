import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { TimesPipeModule } from 'src/app/shared/pipes/times/times.module'
import { ButtonModule } from 'src/app/shared/ui/controls/button/button.module'
import { ProductCardModule } from '../product-card/product-card.module'
import { ProductListingComponent } from './product-listing.component'

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    TimesPipeModule,
    ProductCardModule,
    ReactiveComponentModule
  ],
  declarations: [ProductListingComponent],
  exports: [ProductListingComponent]
})
export class ProductListingModule {}