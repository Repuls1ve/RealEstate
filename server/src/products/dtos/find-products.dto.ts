import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class FindProductsDto {
  @IsOptional()
  @IsString()
  @IsIn(['sell', 'rent'])
  public readonly status: string 

  @IsOptional()
  @IsNumber()
  @Min(0)
  public readonly period: string

  @IsOptional()
  @IsString()
  @IsIn(['house', 'villa', 'cottage'])
  public readonly type: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  public readonly priceMin: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  public readonly priceMax: number
}