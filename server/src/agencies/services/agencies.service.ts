import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FindAgenciesDto } from '../dtos/find-agencies.dto'
import { Agency, AgencyDocument } from '../schemas/agency.schema'

@Injectable()
export class AgenciesService {
  constructor(@InjectModel(Agency.name) private readonly agencyModel: Model<AgencyDocument>) {}

  public async find(findAgenciesDto: FindAgenciesDto): Promise<AgencyDocument[]> {
    const { name, limit } = findAgenciesDto

    return this.agencyModel
      .find({
        title: {
          $regex: name ?? '',
          $options: 'i'
        }
      })
      .limit(limit ?? 0)
  }
}
