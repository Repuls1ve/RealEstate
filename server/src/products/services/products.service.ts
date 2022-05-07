import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { Paginated, PaginationMetaInfo } from 'src/common/types/pagination.type'
import { CreateProductDto } from '../dtos/create-product.dto'
import { FindProductDto } from '../dtos/find-product.dto'
import { FindProductsDto } from '../dtos/find-products.dto'
import { Product, ProductDocument } from '../schemas/product.schema'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  public async find(findProductsDto: FindProductsDto): Promise<Paginated<ProductDocument[]>> {
    const {
      priceMin,
      priceMax,
      period,
      status,
      type,
      limit,
      page
    } = findProductsDto

    const query: FilterQuery<ProductDocument> = {
      ...status && {
      'en.details.status': {
        $regex: status,
        $options: 'i'
      }},
      ...type && {
      'en.details.category': {
        $regex: type,
        $options: 'i'
      }},
      ...period && {
        'createdAt': {
        $gt: new Date().getTime() - 1000 * 60 * 60 * 24 * period,
      }},
      'en.details.price': {
        $gte: priceMin ?? 0,
        ...priceMax && { $lte: priceMax }
      }
    }

    const products = await this.productModel.find(query)
    
    const meta: PaginationMetaInfo = {
      totalPages: Math.ceil(products.length / limit),
      totalItems: products.length,
      currentPage: page,
      limit
    }
    const results: Paginated<ProductDocument[]> = {
      data: products.slice((page - 1) * limit, page * limit),
      meta
    }

    return results
  }

  public async findOne(findProductDto: FindProductDto): Promise<ProductDocument> {
    return this.productModel.findOne({'en.details.uid': findProductDto.uid})
  }

  public async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(createProductDto)
  }
}
