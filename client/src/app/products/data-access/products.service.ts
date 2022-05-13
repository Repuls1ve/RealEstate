import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { delay, Observable } from 'rxjs'
import { Translatable } from '@core/i18n/i18n.types'
import { Paginated, PaginationMetaInfo, PaginationParams } from '@core/types/pagination.type'
import { Category, Product, ProductDetails, PropertyStatus } from '@shared/models/product.model'
import { environment } from '@environments/environment'
import { Period } from '@app/products/feature/product-catalog/product-catalog.store'

export interface GetProductsParams extends PaginationParams {
  readonly priceMin?: number
  readonly priceMax?: number
  readonly status: PropertyStatus
  readonly period: Period | number
  readonly category: Category
}

export interface CreateProductParams extends Translatable<Omit<Product, 'agency'>> {}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseURL = environment.baseURL

  constructor(private readonly http: HttpClient) {}

  public getProducts(params: GetProductsParams): Observable<Paginated<Translatable<Product>[]>> {
    return this.http
      .get<Paginated<Translatable<Product>[]>>(this.baseURL + 'products', { params: params as any })
      .pipe(delay(1500))
  }

  public getLatestProducts(limit: PaginationMetaInfo['limit']): Observable<Translatable<Product>[]> {
    const params = { limit }

    return this.http.get<Translatable<Product>[]>(this.baseURL + 'products/latest', { params }).pipe(delay(1500))
  }

  public getProduct(uid: ProductDetails['uid']): Observable<Translatable<Product>> {
    return this.http.get<Translatable<Product>>(this.baseURL + `products/${uid}`).pipe(delay(1500))
  }

  public createProduct(params: CreateProductParams): Observable<Translatable<Product>> {
    return this.http.post<Translatable<Product>>(this.baseURL + 'products/create', params)
  }
}
