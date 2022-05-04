import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductCatalogPage } from './product-catalog.page'

const routes: Routes = [
  {
    path: '',
    component: ProductCatalogPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogRoutingModule {}