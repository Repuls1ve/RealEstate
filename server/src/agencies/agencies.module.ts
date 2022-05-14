import { Module } from '@nestjs/common'
import { AgenciesService } from './services/agencies.service'
import { AgenciesController } from './controllers/agencies.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { AgencyModel } from './schemas/agency.schema'

@Module({
  imports: [MongooseModule.forFeature([AgencyModel])],
  providers: [AgenciesService],
  controllers: [AgenciesController],
  exports: [AgenciesService]
})
export class AgenciesModule {}
