import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output()
  public readonly sidebarOpenRequest = new EventEmitter()

  public requestSidebarOpen(): void {
    this.sidebarOpenRequest.emit()
  }
}
