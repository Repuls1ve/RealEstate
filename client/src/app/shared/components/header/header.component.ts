import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output()
  public opening = new EventEmitter()

  public showSidebar(): void {
    this.opening.emit()
  }
}
