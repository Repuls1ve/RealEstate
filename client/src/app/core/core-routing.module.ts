import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../home/feature/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('../products/feature/product-shell/product-shell.module').then(m => m.ProductShellModule)
  },
  {
    path: 'agencies',
    loadChildren: () => import('../agencies/feature/agency-shell/agency-shell.module').then(m => m.AgencyShellModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
