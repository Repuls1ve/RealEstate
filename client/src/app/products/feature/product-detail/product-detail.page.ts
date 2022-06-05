import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductDetailStore } from './product-detail.store'

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailStore]
})
export class ProductDetailPage implements OnInit {
  public readonly vm$ = this.productDetailStore.vm$

  constructor(private readonly productDetailStore: ProductDetailStore, private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.observeParamsChange()
  }

  private observeParamsChange(): void {
    this.route.params.subscribe(params => this.productDetailStore.fetchProduct(params['id']))
  }
}
