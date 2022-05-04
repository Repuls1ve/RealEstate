import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input()
  public visible = false

  @Output()
  public readonly sidebarCloseRequest = new EventEmitter()

  public requestSidebarClose(): void {
    this.sidebarCloseRequest.emit()
  }
}