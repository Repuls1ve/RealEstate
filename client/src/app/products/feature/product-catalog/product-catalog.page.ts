import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { tap } from 'rxjs'
import { PageEvent } from 'src/app/shared/ui/paginator/paginator.store'
import { SearchFormParams } from 'src/app/shared/ui/search-form/search-form.component'
import { ProductCatalogParams, ProductCatalogStore } from './product-catalog.store'

@Component({
  selector: 'product-catalog-page',
  templateUrl: './product-catalog.page.html',
  styleUrls: ['./product-catalog.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCatalogStore]
})
export class ProductCatalogPage implements OnInit {
  public readonly vm$ = this.productCatalogStore.vm$

  constructor(
    private readonly productCatalogStore: ProductCatalogStore,
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.observeLanguageChange()
    this.observeParamsChange()
  }

  public changePage(event: PageEvent): void {
    const queryParams: Pick<ProductCatalogParams, 'page'> = { page: String(++event.pageIndex) }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    })
  }

  public onSearch(params: SearchFormParams): void {
    const queryParams: ProductCatalogParams = {
      period: params.period,
      priceMin: params.price.min ?? undefined,
      priceMax: params.price.max ?? undefined,
      status: params.status,
      type: params.type,
      page: '1'
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    })
  }

  private observeLanguageChange(): void {
    const onLanguageChange$ = this.translate.onLangChange.pipe(
      tap(() => this.productCatalogStore.updateLanguage())
    )
    this.productCatalogStore.subscribeTo(onLanguageChange$)
  }

  private observeParamsChange(): void {
    this.route.queryParams.subscribe(params => 
      this.productCatalogStore.fetchProducts(params)
    )
  }
}