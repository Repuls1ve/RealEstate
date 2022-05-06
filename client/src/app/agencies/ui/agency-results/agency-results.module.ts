import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TimesPipeModule } from 'src/app/shared/pipes/times/times.module'
import { AgencyCardModule } from '../agency-card/agency-card.module'
import { AgencyResultsComponent } from './agency-results.component'

@NgModule({
  imports: [
    CommonModule,
    TimesPipeModule,
    AgencyCardModule
  ],
  declarations: [AgencyResultsComponent],
  exports: [AgencyResultsComponent]
})
export class AgencyResultsModule {}