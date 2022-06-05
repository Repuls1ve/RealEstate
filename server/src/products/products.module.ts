import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'
import { ProductsController } from './controllers/products.controller'
import { ProductModel } from './schemas/product.schema'
import { ProductsService } from './services/products.service'

@Module({
  imports: [MongooseModule.forFeature([ProductModel]), CloudinaryModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
