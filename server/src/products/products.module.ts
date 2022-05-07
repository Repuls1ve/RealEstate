import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsController } from './controllers/products.controller'
import { ProductModel } from './schemas/product.schema'
import { ProductsService } from './services/products.service'

@Module({
  imports: [MongooseModule.forFeature([ProductModel])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
