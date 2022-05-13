import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { Paginated, PaginationMetaInfo } from 'src/common/types/pagination.type'
import { CreateProductDto } from '../dtos/create-product.dto'
import { FindLatestProductsDto } from '../dtos/find-latest-products.dto'
import { FindProductDto } from '../dtos/find-product.dto'
import { FindProductsDto, Period } from '../dtos/find-products.dto'
import { Category, PropertyStatus } from '../entities/product.entity'
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
      category,
      limit,
      page
    } = findProductsDto

    const query: FilterQuery<ProductDocument> = {
      ...status != PropertyStatus.Any && {
      'en.details.status': {
        $regex: status,
        $options: 'i'
      }},
      ...category != Category.Any && {
      'en.details.category': {
        $regex: category,
        $options: 'i'
      }},
      ...period != Period.Any && {
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

  public async findLatest(findLatestProductsDto: FindLatestProductsDto): Promise<ProductDocument[]> {
    const { limit } = findLatestProductsDto

    return this.productModel.find()
      .sort({ createdAt: 'desc' })
      .limit(limit)
  }

  public async findOne(findProductDto: FindProductDto): Promise<ProductDocument> {
    return this.productModel.findOne({'en.details.uid': findProductDto.uid})
  }

  public async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(createProductDto)
  }
}
