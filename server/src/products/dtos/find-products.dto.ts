import { Type } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

export class FindProductsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsIn(['sell', 'rent'])
  public readonly status?: string 

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public readonly period?: number

  @IsOptional()
  @IsString()
  @IsIn(['house', 'villa', 'cottage'])
  public readonly type?: string

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