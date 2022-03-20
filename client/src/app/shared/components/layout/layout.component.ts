import { Component } from '@angular/core'

@Component({
  selector: 'main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public sidebar = false

  public useSidebar(opened: boolean): void {
    this.sidebar = opened
  }
}
