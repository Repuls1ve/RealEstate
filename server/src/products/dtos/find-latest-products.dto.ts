import { PickType } from '@nestjs/swagger'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

export class FindLatestProductsDto extends PickType(PaginationDto, ['limit'] as const) {}
