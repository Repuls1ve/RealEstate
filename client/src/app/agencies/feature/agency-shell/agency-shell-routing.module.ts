import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const LoadChildrenCallbacks = {
  AgencyList: () => import('../agency-list/agency-list.module').then(m => m.AgencyListModule)
}

const routes: Routes = [
  {
    path: '',
    loadChildren: LoadChildrenCallbacks.AgencyList
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
export class AgencyShellRoutingModule {}
