import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProductDetails as IProductDetails } from '../entities/product.entity'

@Schema({_id: false})
export class ProductDetails implements IProductDetails {
  @Prop({
    type: String,
    required: true
  })
  public readonly uid: IProductDetails['uid']
  
  @Prop({
    type: Number,
    required: true
  })
  public readonly price: IProductDetails['price']

  @Prop({
    type: String,
    required: true
  })
  public readonly size: IProductDetails['size']

  @Prop({
    type: String,
    required: true
  })
  public readonly category: IProductDetails['category']

  @Prop({
    type: String,
    required: true
  })
  public readonly status: IProductDetails['status']

  @Prop({
    type: Number,
    required: true
  })
  public readonly year: IProductDetails['year']
}

export const ProductDetailsSchema = SchemaFactory.createForClass(ProductDetails)