import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Category } from '@shared/enums/category.enum'
import { ProductCategoriesState, ProductCategoriesStore } from './product-categories.store'

@Component({
  selector: 'app-product-categories',
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
    this.changeCategory(Category.Any)
  }

  public changeCategory(category: ProductCategoriesState['category']): void {
    this.productCategoriesStore.changeCategory(category)
  }
}
