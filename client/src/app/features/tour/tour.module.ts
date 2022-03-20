import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module';
import { TourRoutingModule } from './routing/tour-routing.module'
import { TourComponent } from './views/tour/tour.component'

@NgModule({
  declarations: [
    TourComponent
  ],
  imports: [
    TourRoutingModule,
    SharedModule
  ]
})
export class TourModule {}
