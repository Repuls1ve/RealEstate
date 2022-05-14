import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { PaginatorModule } from '@shared/ui/paginator/paginator.module'
import { SearchFormModule } from '@shared/ui/search-form/search-form.module'
import { ProductResultsModule } from '@app/products/ui/product-results/product-results.module'
import { ProductCatalogRoutingModule } from './product-catalog-routing.module'
import { ProductCatalogPage } from './product-catalog.page'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PaginatorModule,
    SearchFormModule,
    ProductResultsModule,
    ReactiveComponentModule,
    ProductCatalogRoutingModule
  ],
  declarations: [ProductCatalogPage]
})
export class ProductCatalogPageModule {}
