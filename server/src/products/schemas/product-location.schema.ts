import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProductLocation as IProductLocation } from 'src/products/entities/product.entity'
import { ProductAddressSchema } from './product-address.schema'

@Schema({ _id: false })
export class ProductLocation implements IProductLocation {
  @Prop({
    type: String,
    required: true
  })
  public readonly position: IProductLocation['position']

  @Prop({
    type: ProductAddressSchema,
    required: true
  })
  public readonly address: IProductLocation['address']
}

export const ProductLocationSchema = SchemaFactory.createForClass(ProductLocation)
