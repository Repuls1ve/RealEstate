import { AgencyEntity } from '../../agencies/entities/agency.entity'

export interface ProductEntity {
  readonly title: string
  readonly location: ProductLocation
  readonly description: string
  readonly overview: string[]
  readonly details: ProductDetails
  readonly photos: Photo[]
  readonly agency: AgencyEntity
}

export interface ProductLocation {
  readonly position: string
  readonly address: Address
}

export interface ProductDetails {
  readonly uid: string
  readonly price: number
  readonly size: string
  readonly category: string
  readonly status: string
  readonly year: number
}

export interface Address {
  readonly city: string
  readonly state: string
  readonly zip: string
  readonly area: string
  readonly country: string
}

export interface Photo {
  readonly source: string
  readonly alt: string
}

export enum Category {
  Apartments = 'apartments',
  Condominium = 'condominium',
  MultiFamily = 'multi-family',
  SingleFamily = 'single-family',
  Townhouse = 'townhouse',
  Duplex = 'duplex',
  Any = 'any'
}

export enum PropertyStatus {
  Sell = 'sell',
  Rent = 'rent',
  Any = 'any'
}
