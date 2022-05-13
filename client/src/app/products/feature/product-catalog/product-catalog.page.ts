import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { PageEvent } from '@shared/ui/paginator/paginator.store'
import { SearchFormParams } from '@shared/ui/search-form/search-form.store'
import { ProductCatalogStore } from './product-catalog.store'

@Component({
  selector: 'product-catalog-page',
  templateUrl: './product-catalog.page.html',
  styleUrls: ['./product-catalog.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCatalogStore]
})
export class ProductCatalogPage implements OnInit {
  public readonly vm$ = this.productCatalogStore.vm$

  constructor(private readonly productCatalogStore: ProductCatalogStore) {}

  public ngOnInit(): void {
    this.observeLanguageChange()
    this.observeParamsChange()
  }

  public changePage(event: PageEvent): void {
    this.productCatalogStore.changePage(event)
  }

  public onSearch(params: SearchFormParams): void {
    this.productCatalogStore.onSearch(params)
  }

  private observeLanguageChange(): void {
    this.productCatalogStore.observeLanguageChange()
  }

  private observeParamsChange(): void {
    this.productCatalogStore.observeParamsChange()
  }
}