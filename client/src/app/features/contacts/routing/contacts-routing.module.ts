import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routes } from './contacts-routes'

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class ContactsRoutingModule {}