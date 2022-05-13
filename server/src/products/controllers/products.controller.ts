import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { Paginated } from 'src/common/types/pagination.type'
import { CreateProductDto } from '../dtos/create-product.dto'
import { FindLatestProductsDto } from '../dtos/find-latest-products.dto'
import { FindProductDto } from '../dtos/find-product.dto'
import { FindProductsDto } from '../dtos/find-products.dto'
import { ProductDocument } from '../schemas/product.schema'
import { ProductsService } from '../services/products.service'

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async find(@Query() findProductsDto: FindProductsDto): Promise<Paginated<ProductDocument[]>> {
    return this.productsService.find(findProductsDto)
  }

  @Get('one/:uid')
  public async findOne(@Param() findProductDto: FindProductDto): Promise<ProductDocument> {
    return this.productsService.findOne(findProductDto)
  }

  @Get('latest')
  public async findLatest(@Query() findLatestProductsDto: FindLatestProductsDto): Promise<ProductDocument[]> {
    return this.productsService.findLatest(findLatestProductsDto)
  }

  @Post('create')
  public async create(@Body() createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productsService.create(createProductDto)
  }
}
