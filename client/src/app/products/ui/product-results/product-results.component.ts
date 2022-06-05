import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ProductResultsMeta, ProductResultsState, ProductResultsStore } from './product-results.store'

@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductResultsStore]
})
export class ProductResultsComponent {
  public readonly vm$ = this.productResultsStore.vm$

  @Input()
  public set meta(value: ProductResultsMeta) {
    this.productResultsStore.setMeta(value)
  }

  @Input()
  public set products(value: ProductResultsState['products']) {
    this.productResultsStore.setProducts(value)
  }

  @Input()
  public set limit(value: ProductResultsState['limit']) {
    this.productResultsStore.setLimit(value)
  }

  @Input()
  public set loading(value: ProductResultsState['loading']) {
    this.productResultsStore.setLoading(value)
  }

  constructor(private readonly productResultsStore: ProductResultsStore) {}
}
