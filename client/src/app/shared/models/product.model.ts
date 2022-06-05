import { CategoryT } from '../enums/category.enum'
import { PropertyStatusT } from '../enums/property-status.enum'
import { Agency } from './agency.model'

export interface Product {
  readonly title: string
  readonly location: ProductLocation
  readonly description: string
  readonly overview: string[]
  readonly details: ProductDetails
  readonly photos: Photo[]
  readonly agency: Agency
}

export interface ProductLocation {
  readonly position: string
  readonly address: Address
}

export interface ProductDetails {
  readonly uid: string
  readonly price: number
  readonly size: string
  readonly category: CategoryT
  readonly status: PropertyStatusT
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
