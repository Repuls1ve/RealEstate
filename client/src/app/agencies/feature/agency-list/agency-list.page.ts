import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AgencyListStore } from './agency-list.store'

@Component({
  selector: 'agency-list-page',
  templateUrl: './agency-list.page.html',
  styleUrls: ['./agency-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AgencyListStore]
})
export class AgencyListPage {}