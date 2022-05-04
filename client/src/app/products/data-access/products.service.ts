import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, timer } from 'rxjs'
import { Translatable } from 'src/app/core/i18n/i18n.types'
import { MockTranslatableProduct, Product, ProductDetails } from 'src/app/shared/models/product.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseURL = environment.baseURL

  constructor(private readonly http: HttpClient) {}

  public getNewestProducts(quantity: number): Observable<Translatable<Product>[]> {
    return timer(3500).pipe(
      map(() => Array(quantity).fill(MockTranslatableProduct))
    )
  }

  public getProduct(uid: ProductDetails['uid']): Observable<Translatable<Product>> {
    return timer(2500).pipe(
      map(() => MockTranslatableProduct)
    )
  }
}