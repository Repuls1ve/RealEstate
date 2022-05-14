import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductCreationPage } from './product-creation.page'

const routes: Routes = [
  {
    path: '',
    component: ProductCreationPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCreationRoutingModule {}
