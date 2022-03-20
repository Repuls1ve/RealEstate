import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './routing/home-routing.module'
import { HomeComponent } from './views/home/home.component'

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule {}
