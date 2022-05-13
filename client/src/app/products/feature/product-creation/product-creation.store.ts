import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, switchMap } from 'rxjs'
import { ProductsService } from '@app/products/data-access/products.service'
import { ProductCreationFormParams } from '@app/products/ui/product-creation-form/product-creation-form.store'

export interface ProductCreationState {}

@Injectable()
export class ProductCreationStore extends ComponentStore<ProductCreationState> {
  constructor(private readonly productsService: ProductsService) {
    super({})
  }

  public readonly vm$ = this.select(state => state)

  public readonly onCreate = this.effect((values$: Observable<ProductCreationFormParams>) => values$.pipe(
    map(values => ({
      en: {
        title: values.title,
        description: values.description,
        details: {
          uid: values.uid,
          category: values.category,
          price: values.price,
          size: values.size,
          status: values.status,
          year: values.year
        },
        location: {
          position: values.position,
          address: {
            area: values.area,
            city: values.city,
            country: values.country,
            state: values.state,
            zip: values.zip
          }
        },
        overview: values.overview,
        photos: [],
        agency: values.agency
      },
      ru: {
        title: values.translation.title,
        description: values.translation.description,
        details: {
          category: values.category,
          price: values.price,
          size: values.translation.size,
          status: values.status,
          uid: values.uid,
          year: values.year
        },
        location: {
          position: values.translation.position,
          address: {
            area: values.translation.area,
            city: values.translation.city,
            country: values.translation.country,
            state: values.translation.state,
            zip: values.zip
          }
        },
        overview: values.overview,
        photos: [],
        agency: '626802fedc182eb266ec89ce'
      }
    })),
    switchMap(params => this.productsService.createProduct(params))
  ))
}