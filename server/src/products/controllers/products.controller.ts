import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Paginated } from 'src/common/types/pagination.type'
import { CreateProductDto } from '../dtos/create-product.dto'
import { FindNeveltiesDto } from '../dtos/find-nevelties.dto'
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

  @Get('nevelties')
  public async findNevelties(@Query() findNeveltiesDto: FindNeveltiesDto): Promise<ProductDocument[]> {
    return this.productsService.findNevelties(findNeveltiesDto)
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductDocument> {
    return this.productsService.create(createProductDto)
  }

  @Delete('drop')
  public async drop() {
    return this.productsService.deleteAll()
  }
}
