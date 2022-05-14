import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LayoutStore } from './layout.store'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayoutStore]
})
export class LayoutComponent {
  public readonly vm$ = this.layoutStore.vm$

  constructor(private readonly layoutStore: LayoutStore) {}

  public toggleSidebar(opened: boolean): void {
    this.layoutStore.toggleSidebar(opened)
  }
}
