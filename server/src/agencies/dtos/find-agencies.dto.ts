import { PartialType, PickType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { Agency } from '../schemas/agency.schema'

export class FindAgenciesDto extends PartialType(PickType(PaginationDto, ['limit'] as const)) {
  @IsOptional()
  @IsString()
  public readonly name?: Agency['title']

  @IsOptional()
  public readonly limit?: number
}
