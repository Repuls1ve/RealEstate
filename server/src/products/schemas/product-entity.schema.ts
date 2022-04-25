import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { AgencySchema } from 'src/agencies/schemas/agency.schema'
import { ProductEntity as IProductEntity } from 'src/products/entities/product.entity'
import { ProductDetailsSchema } from './product-details.schema'
import { ProductLocationSchema } from './product-location.schema'
import { ProductPhotoSchema } from './product-photo.schema'

@Schema()
export class ProductEntity implements IProductEntity {
  @Prop({
    type: String,
    required: true
  })
  public readonly title: IProductEntity['title']

  @Prop({
    type: ProductLocationSchema,
    required: true
  })
  public readonly location: IProductEntity['location']

  @Prop({
    type: String,
    required: true
  })
  public readonly description: IProductEntity['description']

  @Prop({
    type: [String],
    required: true
  })
  public readonly overview: IProductEntity['overview']

  @Prop({
    type: ProductDetailsSchema,
    required: true
  })
  public readonly details: IProductEntity['details']

  @Prop({
    type: [ProductPhotoSchema],
    required: true
  })
  public readonly photos: IProductEntity['photos']

  @Prop({
    type: AgencySchema,
    required: true
  })
  public readonly agency: IProductEntity['agency']
}

export const ProductEntitySchema = SchemaFactory.createForClass(ProductEntity)  
