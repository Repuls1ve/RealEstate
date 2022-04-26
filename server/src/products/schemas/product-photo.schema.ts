import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Photo } from '../entities/product.entity'

@Schema({_id: false})
export class ProductPhoto implements Photo {
  @Prop({
    type: String,
    required: true
  })
  public readonly source: Photo['source']

  @Prop({
    type: String,
    required: true
  })
  public readonly alt: Photo['alt']
}

export const ProductPhotoSchema = SchemaFactory.createForClass(ProductPhoto)