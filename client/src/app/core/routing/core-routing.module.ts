import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routes } from './core-routes'

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
