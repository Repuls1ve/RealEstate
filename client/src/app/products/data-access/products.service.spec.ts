import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { Paginated, PaginationMetaInfo } from '@core/types/pagination.type'
import { Translatable } from '@core/i18n/i18n.types'
import {
  Categories,
  CreateMockProductParams,
  MockTranslatableProduct,
  Product,
  PropertyStatuses
} from '@shared/models/product.model'
import { Period } from '../feature/product-catalog/product-catalog.store'
import { CreateProductParams, GetProductsParams, ProductsService } from './products.service'
import { environment } from '@environments/environment'

describe('ProductsService', () => {
  let productsService: ProductsService
  let controller: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    })

    productsService = TestBed.inject(ProductsService)
    controller = TestBed.inject(HttpTestingController)
  })

  describe('getProducts()', () => {
    const fakeProducts = [MockTranslatableProduct, MockTranslatableProduct]
    const fakePagination: PaginationMetaInfo = {
      totalItems: 20,
      totalPages: 10,
      currentPage: 1,
      limit: 2
    }
    const fakePaginatedProducts: Paginated<Translatable<Product>[]> = {
      data: fakeProducts,
      meta: fakePagination
    }

    it('should return an expected list of paginated products', (done: DoneFn) => {
      const url = environment.baseURL + 'products?category=any&status=any&period=any&limit=2&page=1'
      const params: GetProductsParams = {
        category: Categories.Any,
        status: PropertyStatuses.Any,
        period: Period.Any,
        limit: 2,
        page: 1
      }

      productsService.getProducts(params).subscribe(products => {
        expect(products).toEqual(fakePaginatedProducts)
        done()
      })

      const request = controller.expectOne(url)
      request.flush(fakePaginatedProducts)
      controller.verify()
    })
  })

  describe('getLatestProducts()', () => {
    const fakeProducts = [MockTranslatableProduct, MockTranslatableProduct]

    it('should return an expected list of latest products', (done: DoneFn) => {
      const url = environment.baseURL + 'products/latest?limit=2'
      const limit = 2

      productsService.getLatestProducts(limit).subscribe(products => {
        expect(products).toEqual(fakeProducts)
        done()
      })

      const request = controller.expectOne(url)
      request.flush(fakeProducts)
      controller.verify()
    })
  })

  describe('getProduct()', () => {
    const fakeProduct = MockTranslatableProduct

    it('should return an expected product', (done: DoneFn) => {
      const url = environment.baseURL + 'products/one/AGS1234'
      const uid = 'AGS1234'

      productsService.getProduct(uid).subscribe(product => {
        expect(product).toEqual(fakeProduct)
        done()
      })

      const request = controller.expectOne(url)
      request.flush(fakeProduct)
      controller.verify()
    })
  })

  describe('createProduct()', () => {
    const fakeProduct = MockTranslatableProduct

    it('should create a new product', (done: DoneFn) => {
      const url = environment.baseURL + 'products/create'
      const params = CreateMockProductParams

      productsService.createProduct(params).subscribe(product => {
        expect(product).toEqual(fakeProduct)
        done()
      })

      const request = controller.expectOne(url)
      request.flush(fakeProduct)
      controller.verify()
    })
  })
})
