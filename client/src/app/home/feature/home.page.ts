import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ProductSearchEvent } from '@app/products/ui/product-search/product-search.component'
import { HomeStore } from './home.store'

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore]
})
export class HomePageComponent {
  public readonly vm$ = this.homeStore.vm$

  constructor(private readonly homeStore: HomeStore) {}

  public onSearch(event: ProductSearchEvent): void {
    this.homeStore.onSearch(event)
  }
}
