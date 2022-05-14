import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { AgencyEntity } from '../entities/agency.entity'

export type AgencyDocument = Agency & Document

@Schema({ timestamps: true })
export class Agency implements AgencyEntity {
  @Prop({
    type: String,
    required: true
  })
  public readonly title: AgencyEntity['title']

  @Prop({
    type: String,
    required: true
  })
  public readonly location: AgencyEntity['location']

  @Prop({
    type: String,
    required: true
  })
  public readonly phone: AgencyEntity['phone']

  @Prop({
    type: String,
    required: true
  })
  public readonly email: AgencyEntity['email']
}

export const AgencySchema = SchemaFactory.createForClass(Agency)

export const AgencyModel: ModelDefinition = {
  name: Agency.name,
  schema: AgencySchema
}
