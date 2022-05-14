import { Type } from 'class-transformer'
import { IsNumber, Min } from 'class-validator'

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public readonly page: number

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public readonly limit: number
}
