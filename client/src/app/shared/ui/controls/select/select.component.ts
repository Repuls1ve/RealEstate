import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'select[shared-select]',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {}
