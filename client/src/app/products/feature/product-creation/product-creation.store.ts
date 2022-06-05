import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { ProductsService } from '@app/products/data-access/products.service'

export interface ProductCreationState {}

@Injectable()
export class ProductCreationStore extends ComponentStore<ProductCreationState> {
  constructor(private readonly productsService: ProductsService) {
    super({})
  }

  public readonly vm$ = this.select(state => state)

  public readonly onCreate = this.effect(values$ => values$)
}
