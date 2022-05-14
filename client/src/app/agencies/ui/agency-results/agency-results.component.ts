import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Agency } from 'src/app/shared/models/agency.model'

@Component({
  selector: 'agency-results',
  templateUrl: './agency-results.component.html',
  styleUrls: ['./agency-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyResultsComponent {
  @Input()
  public agencies: Agency[] | null = null

  @Input()
  public isLoading = false
}
