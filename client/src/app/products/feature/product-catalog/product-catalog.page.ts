import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { PageEvent } from '@shared/ui/paginator/paginator.store'
import { ProductSearchEvent } from '@app/products/ui/product-search/product-search.component'
import { ProductCatalogStore } from './product-catalog.store'

@Component({
  selector: 'app-product-catalog-page',
  templateUrl: './product-catalog.page.html',
  styleUrls: ['./product-catalog.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCatalogStore]
})
export class ProductCatalogPage implements OnInit {
  public readonly vm$ = this.productCatalogStore.vm$

  constructor(private readonly productCatalogStore: ProductCatalogStore) {}

  public ngOnInit(): void {
    this.observeParamsChange()
  }

  public changePage(event: PageEvent): void {
    this.productCatalogStore.changePage(event)
  }

  public onSearch(event: ProductSearchEvent): void {
    this.productCatalogStore.onSearch(event)
  }

  private observeParamsChange(): void {
    this.productCatalogStore.observeParamsChange()
  }
}
