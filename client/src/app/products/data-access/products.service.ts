import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { delay, Observable } from 'rxjs'
import { Paginated, PaginationMetaInfo, PaginationParams } from '@shared/interfaces/pagination.interface'
import { environment } from '@environments/environment'
import { Product, ProductDetails } from '@shared/models/product.model'
import { PeriodT } from '@shared/enums/period.enum'

export interface FindProductsParams extends PaginationParams {
  readonly priceMin?: number
  readonly priceMax?: number
  readonly status: ProductDetails['status']
  readonly category: ProductDetails['category']
  readonly period: PeriodT
}

export interface CreateProductParams extends Omit<Product, 'agency'> {}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseURL = environment.baseURL

  constructor(private readonly http: HttpClient) {}

  public find(params: FindProductsParams): Observable<Paginated<Product[]>> {
    return this.http.get<Paginated<Product[]>>(this.baseURL + 'products', { params: params as any }).pipe(delay(1500))
  }

  public findOne(uid: ProductDetails['uid']): Observable<Product> {
    return this.http.get<Product>(this.baseURL + `products/one/${uid}`).pipe(delay(1500))
  }

  public findNevelties(limit: PaginationMetaInfo['limit']): Observable<Product[]> {
    const params = { limit }

    return this.http.get<Product[]>(this.baseURL + 'products/nevelties', { params }).pipe(delay(1500))
  }

  public create(params: CreateProductParams): Observable<Product> {
    return this.http.post<Product>(this.baseURL + 'products/create', params)
  }
}
