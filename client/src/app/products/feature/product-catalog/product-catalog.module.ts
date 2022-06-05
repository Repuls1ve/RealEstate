import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { PaginatorModule } from '@shared/ui/paginator/paginator.module'
import { ProductSearchModule } from '@app/products/ui/product-search/product-search.module'
import { ProductResultsModule } from '@app/products/ui/product-results/product-results.module'
import { ProductCatalogRoutingModule } from './product-catalog-routing.module'
import { ProductCatalogPage } from './product-catalog.page'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PaginatorModule,
    ProductSearchModule,
    ProductResultsModule,
    ReactiveComponentModule,
    ProductCatalogRoutingModule
  ],
  declarations: [ProductCatalogPage]
})
export class ProductCatalogPageModule {}
