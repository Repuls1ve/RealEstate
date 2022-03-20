import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input()
  public visible = false

  @Output()
  public closing = new EventEmitter()

  public closeSidebar(): void {
    this.closing.emit()
  }
}
