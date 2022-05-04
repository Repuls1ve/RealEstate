import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { tap } from 'rxjs'
import { ProductListingStore } from './product-listing.store'

@Component({
  selector: 'product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductListingStore]
})
export class ProductListingComponent implements OnInit {
  public readonly vm$ = this.productListingStore.vm$

  @Input()
  public set quantity(value: number) {
    this.productListingStore.fetchProducts(value)
  }

  constructor(
    private readonly productListingStore: ProductListingStore,
    private readonly translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.observeLanguageChange()
  }

  private observeLanguageChange(): void {
    const onLanguageChange$ = this.translate.onLangChange.pipe(
      tap(() => this.productListingStore.updateLanguage())
    )
    this.productListingStore.subscribeTo(onLanguageChange$)
  }
}