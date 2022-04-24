import { Module } from '@nestjs/common'
import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
