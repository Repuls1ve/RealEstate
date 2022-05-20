import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
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
  public loading = false

  @Output()
  public readonly contact = new EventEmitter<Agency>()

  public onContact(): void {
    this.contact.emit(this.agency as Agency)
  }
}
