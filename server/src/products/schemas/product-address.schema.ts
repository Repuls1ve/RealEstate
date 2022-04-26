import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Address } from 'src/products/entities/product.entity'

@Schema({_id: false})
export class ProductAddress implements Address {
  @Prop({
    type: String,
    required: true
  })
  public readonly city: Address['city']

  @Prop({
    type: String,
    required: true
  })
  public readonly state: Address['state']

  @Prop({
    type: String,
    required: true
  })
  public readonly zip: Address['zip']
  
  @Prop({
    type: String,
    required: true
  })
  public readonly area: Address['area']

  @Prop({
    type: String,
    required: true
  })
  public readonly country: Address['country']
}

export const ProductAddressSchema = SchemaFactory.createForClass(ProductAddress)