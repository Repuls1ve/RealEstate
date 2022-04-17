import { Component, Input } from '@angular/core'
import { Product } from 'src/app/shared/models/product.model'

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input()
  public product: Product | null | undefined

  @Input()
  public isLoading = false
}
