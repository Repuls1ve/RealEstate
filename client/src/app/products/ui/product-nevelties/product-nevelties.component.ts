import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ProductNeveltiesState, ProductNeveltiesStore } from './product-nevelties.store'

@Component({
  selector: 'app-product-nevelties',
  templateUrl: './product-nevelties.component.html',
  styleUrls: ['./product-nevelties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductNeveltiesStore]
})
export class ProductNeveltiesComponent {
  public readonly vm$ = this.productNeveltiesStore.vm$

  @Input()
  public set quantity(value: ProductNeveltiesState['quantity']) {
    this.fetchNevelties(value)
  }

  constructor(private readonly productNeveltiesStore: ProductNeveltiesStore) {}

  public fetchNevelties(quantity: ProductNeveltiesState['quantity']): void {
    this.productNeveltiesStore.fetchNevelties(quantity)
  }
}
