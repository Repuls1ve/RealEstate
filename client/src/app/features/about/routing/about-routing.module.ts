import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routes } from './about-routes'

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class AboutRoutingModule {}