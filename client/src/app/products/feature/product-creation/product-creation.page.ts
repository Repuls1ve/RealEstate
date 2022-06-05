import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ProductCreationFormParams } from '@app/products/ui/product-creation-form/product-creation-form.store'
import { ProductCreationStore } from './product-creation.store'

@Component({
  selector: 'app-product-creation-page',
  templateUrl: './product-creation.page.html',
  styleUrls: ['./product-creation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCreationStore]
})
export class ProductCreationPage {
  public readonly vm$ = this.productCreationStore.vm$

  constructor(private readonly productCreationStore: ProductCreationStore) {}

  public onCreate(params: ProductCreationFormParams): void {
    this.productCreationStore.onCreate()
  }
}
