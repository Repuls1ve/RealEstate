import { Translatable } from 'src/app/core/i18n/i18n.types'
import { Agency, MockAgency } from './agency.model'

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

export type Category = 'apartments' | 'condominium' | 'multi-family' | 'single-family' | 'townhouse' | 'duplex' | 'any'

export enum Categories {
  Apartments = 'apartments',
  Condominium = 'condominium',
  MultiFamily = 'multi-family',
  SingleFamily = 'single-family',
  Townhouse = 'townhouse',
  Duplex = 'duplex',
  Any = 'any'
}

export type PropertyStatus = 'sell' | 'rent' | 'any'

export enum PropertyStatuses {
  Sell = 'sell',
  Rent = 'rent',
  Any = 'any'
}

export const MockTranslatableProduct: Translatable<Product> = {
  "ru": {
      "title": "Большой Семейный Дом",
      "location": {
          "position": "Огайо-стрит, Южные ворота, Калифорния",
          "address": {
              "city": "Южные Ворота",
              "state": "Калифорния",
              "zip": "90280",
              "area": "Центральный город",
              "country": "США"
          }
      },
      "description": "Снаружи этот дом выглядит внушительно. Он был построен из желтой сосны и украшен бордовым кирпичом. Высокие, широкие окна пропускают в дом достаточно света и были добавлены к дому в основном симметрично. Дом оборудован старинной кухней и одной небольшой ванной комнатой, а также теплой гостиной, пятью спальнями, большой столовой и вместительным подвалом. Здание квадратной формы. Дом полностью окружен крытым патио. Второй этаж меньше первого, что в сочетании с крышей создает многоуровневый вид.",
      "overview": [
          "4 Спальни",
          "3 Ванные комнаты",
          "280 Квадратных метров",
          "Есть гараж"
      ],
      "details": {
          "uid": "AGS1234",
          "price": 250000,
          "size": "280 квадратных метров",
          "category": "Дом",
          "status": "Продажа",
          "year": 2001
      },
      "photos": [],
      "agency": MockAgency
  },
  "en": {
      "title": "Grand Family House",
      "location": {
          "position": "Ohio St. South Gate, California",
          "address": {
              "city": "South Gate",
              "state": "California",
              "zip": "90280",
              "area": "Central City",
              "country": "US"
          }
      },
      "description": "From the outside this house looks impressive. It has been built with yellow pine wood and has burgandy brick decorations. Tall, wide windows allow enough light to enter the home and have been added to the house in a mostly symmetric way. The house is equipped with an old-fashioned kitchen and one small bathroom, it also has a warm living room, five bedrooms, a grand dining room and a roomy basement. The building is square shaped. The house is fully surrounded by a covered patio. The second floor is smaller than the first, which creates a layered style of look in combination with the roof.",
      "overview": [
          "4 Bedrooms",
          "3 Bathrooms",
          "280 sqm",
          "1 Garage"
      ],
      "details": {
          "uid": "AGS1234",
          "price": 250000,
          "size": "280 sqm",
          "category": "House",
          "status": "Sale",
          "year": 2001
      },
      "photos": [],
      "agency": MockAgency
  }
}