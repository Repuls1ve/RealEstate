import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TimesPipeModule } from '@shared/pipes/times/times.module'
import { ButtonModule } from '@shared/ui/controls/button/button.module'
import { ProductCardModule } from '../product-card/product-card.module'
import { ProductCategoriesComponent } from './product-categories.component'

@NgModule({
  imports: [CommonModule, ButtonModule, ProductCardModule, TimesPipeModule, ReactiveComponentModule],
  declarations: [ProductCategoriesComponent],
  exports: [ProductCategoriesComponent]
})
export class ProductCategoriesModule {}
