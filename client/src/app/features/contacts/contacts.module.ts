import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactsRoutingModule } from './routing/contacts-routing.module'
import { ContactsComponent } from './views/contacts/contacts.component'

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule {}
