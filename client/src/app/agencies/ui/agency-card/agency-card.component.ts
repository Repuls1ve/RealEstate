import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Agency, MockAgency } from 'src/app/shared/models/agency.model'

@Component({
  selector: 'agency-card',
  templateUrl: './agency-card.component.html',
  styleUrls: ['./agency-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyCardComponent {
  @Input()
  public agency: Agency | undefined | null = MockAgency

  @Input()
  public isLoading = false
}