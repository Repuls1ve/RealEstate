import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContactComponent {}
