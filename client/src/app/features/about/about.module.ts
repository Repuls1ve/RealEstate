import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutRoutingModule } from './routing/about-routing.module'
import { AboutComponent } from './views/about/about.component'

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AboutRoutingModule,
    SharedModule
  ]
})
export class AboutModule {}
