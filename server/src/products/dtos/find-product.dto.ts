import { IsString } from 'class-validator'
import { ProductDetails } from '../schemas/product-details.schema'

export class FindProductDto {
  @IsString()
  public readonly uid: ProductDetails['uid']
}