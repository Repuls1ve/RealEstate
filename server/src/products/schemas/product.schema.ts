import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ProductEntity } from 'src/products/entities/product.entity'
import { Languages, Translatable } from 'src/common/interfaces/translate.interface'
import { ProductEntitySchema } from './product-entity.schema'

export type ProductDocument = Product & Document

@Schema()
export class Product implements Translatable<ProductEntity> {
  @Prop({
    type: ProductEntitySchema,
    required: true
  })
  public readonly [Languages.ru]: ProductEntity

  @Prop({
    type: ProductEntitySchema,
    required: true
  })
  public readonly [Languages.en]: ProductEntity
}

export const ProductSchema = SchemaFactory.createForClass(Product)

export const ProductModel: ModelDefinition = {
  name: Product.name,
  schema: ProductSchema
} 