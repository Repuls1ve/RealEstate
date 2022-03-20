import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routes } from './home-routes'

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {}