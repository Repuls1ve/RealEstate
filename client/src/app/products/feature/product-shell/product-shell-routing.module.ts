import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const LoadChildrenCallbacks = {
  Catalog: () => import('../product-catalog/product-catalog.module').then(m => m.ProductCatalogPageModule),
  Detail: () => import('../product-detail/product-detail.module').then(m => m.ProductDetailPageModule),
}

const routes: Routes = [
  {
    path: '',
    loadChildren: LoadChildrenCallbacks.Catalog
  },
  {
    path: 'product-detail/:id',
    loadChildren: LoadChildrenCallbacks.Detail
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductShellRoutingModule {}