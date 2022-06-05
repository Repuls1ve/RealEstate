import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { Category, PropertyStatus } from '../entities/product.entity'

export enum Period {
  AllTime = 'all-time'
}

export class FindProductsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsEnum(PropertyStatus)
  public readonly status?: PropertyStatus = PropertyStatus.Any

  @IsOptional()
  public readonly period?: Period | number = Period.AllTime

  @IsOptional()
  @IsString()
  @IsEnum(Category)
  public readonly category?: Category = Category.Any

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public readonly priceMin?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public readonly priceMax?: number
}
