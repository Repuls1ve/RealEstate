import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { PaginatorModule } from '@shared/ui/paginator/paginator.module'
import { AgencyCardModule } from '@app/agencies/ui/agency-card/agency-card.module'
import { AgencyResultsModule } from '@app/agencies/ui/agency-results/agency-results.module'
import { AgencyListRoutingModule } from './agency-list-routing.module'
import { AgencyListPage } from './agency-list.page'

@NgModule({
  imports: [
    CommonModule,
    PaginatorModule,
    TranslateModule,
    AgencyCardModule,
    AgencyResultsModule,
    AgencyListRoutingModule,
    ReactiveComponentModule
  ],
  declarations: [AgencyListPage]
})
export class AgencyListModule {}