import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { tap } from 'rxjs'
import { ProductDetailStore } from './product-detail.store'

@Component({
  selector: 'product-detail-page',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailStore]
})
export class ProductDetailPage {
  public readonly vm$ = this.productDetailStore.vm$

  constructor(
    private readonly productDetailStore: ProductDetailStore,
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.observeLanguageChange()
    this.observeParamsChange()
  }

  private observeLanguageChange(): void {
    const onLanguageChange$ = this.translate.onLangChange.pipe(
      tap(() => this.productDetailStore.updateLanguage())
    )
    this.productDetailStore.subscribeTo(onLanguageChange$)
  }

  private observeParamsChange(): void {
    this.route.params.subscribe(params => 
      this.productDetailStore.fetchProduct(params['id'])
    )
  }
}