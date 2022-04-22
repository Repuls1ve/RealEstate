import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductDetailsStore } from './product-details.store'

@Component({
  selector: 'product-details-page',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailsStore]
})
export class ProductDetailsComponent implements OnInit {
  public readonly vm$ = this.productDetailsStore.vm$

  constructor(
    private readonly productDetailsStore: ProductDetailsStore,
    public readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => 
      this.productDetailsStore.fetchProduct(params['id'])
    )
  }
}
