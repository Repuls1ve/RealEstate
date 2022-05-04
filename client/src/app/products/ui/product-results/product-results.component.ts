import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Product } from 'src/app/shared/models/product.model'

@Component({
  selector: 'product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductResultsComponent {
  @Input()
  public isLoading = true

  @Input()
  public products: Product[] | null = null
}