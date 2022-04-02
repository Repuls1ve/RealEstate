import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module'
import { HomeRoutingModule } from './routing/home-routing.module'
import { HomePageComponent } from './views/home/home.component'
import { DiscoverComponent } from './components/discover/discover.component'
import { BenefitsComponent } from './components/benefits/benefits.component'

@NgModule({
  declarations: [
    DiscoverComponent,
    BenefitsComponent,
    HomePageComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule {}
