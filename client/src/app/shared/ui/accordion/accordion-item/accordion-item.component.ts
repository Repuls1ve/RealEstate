import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionItemComponent {}
