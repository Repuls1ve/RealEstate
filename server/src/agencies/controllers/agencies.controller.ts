import { Controller, Get, Query } from '@nestjs/common'
import { FindAgenciesDto } from '../dtos/find-agencies.dto'
import { AgencyDocument } from '../schemas/agency.schema'
import { AgenciesService } from '../services/agencies.service'

@Controller('api/agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get('find')
  public async find(@Query() findAgenciesDto: FindAgenciesDto): Promise<AgencyDocument[]> {
    return this.agenciesService.find(findAgenciesDto)
  }
}
