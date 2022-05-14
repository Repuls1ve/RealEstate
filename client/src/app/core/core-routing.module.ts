import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'

const LoadChildrenCallbacks = {
  Home: () => import('../home/feature/home.module').then(m => m.HomePageModule),
  Products: () => import('../products/feature/product-shell/product-shell.module').then(m => m.ProductShellModule),
  Agencies: () => import('../agencies/feature/agency-shell/agency-shell.module').then(m => m.AgencyShellModule)
}

const config: ExtraOptions = {
  scrollPositionRestoration: 'top'
}

const routes: Routes = [
  {
    path: 'home',
    loadChildren: LoadChildrenCallbacks.Home
  },
  {
    path: 'catalog',
    loadChildren: LoadChildrenCallbacks.Products
  },
  {
    path: 'agencies',
    loadChildren: LoadChildrenCallbacks.Agencies
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
