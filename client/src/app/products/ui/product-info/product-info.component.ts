import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Product } from '@shared/models/product.model'

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent {
  @Input()
  public product: Product | null | undefined

  @Input()
  public isLoading = false
}