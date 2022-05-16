import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Categories } from '@shared/models/product.model'
import { ProductCategoriesState, ProductCategoriesStore } from './product-categories.store'

@Component({
  selector: 'product-categoies',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCategoriesStore]
})
export class ProductCategoriesComponent implements OnInit {
  public readonly vm$ = this.productCategoriesStore.vm$

  @Input()
  public set quantity(value: number) {
    this.productCategoriesStore.setQuantity(value)
  }

  constructor(private readonly productCategoriesStore: ProductCategoriesStore) {}

  public ngOnInit(): void {
    this.observeLanguageChange()
    this.changeCategory(Categories.Any)
  }

  public changeCategory(category: ProductCategoriesState['category']): void {
    this.productCategoriesStore.changeCategory(category)
  }

  private observeLanguageChange(): void {
    this.productCategoriesStore.observeLanguageChange()
  }
}
