import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductCatalogParams } from 'src/app/products/feature/product-catalog/product-catalog.store'
import { SearchFormParams } from 'src/app/shared/ui/search-form/search-form.component'

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  constructor(private readonly router: Router) {}

  public onSearch(params: SearchFormParams): void {
    const queryParams: ProductCatalogParams = {
      period: params.period,
      priceMin: params.price.min ?? undefined,
      priceMax: params.price.max ?? undefined,
      status: params.status,
      type: params.type,
      page: '1'
    }

    this.router.navigate(['/catalog'], {
      queryParams: queryParams
    })
  }
}