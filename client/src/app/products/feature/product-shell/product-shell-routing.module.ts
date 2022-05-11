import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../product-catalog/product-catalog.module').then(m => m.ProductCatalogPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('../product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'product-creation',
    loadChildren: () => import('../product-creation/product-creation.module').then(m => m.ProductCreationPageModule)
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