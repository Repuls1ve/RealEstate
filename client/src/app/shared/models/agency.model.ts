export interface Agency {
  readonly title: string
  readonly location: string
  readonly phone: string
  readonly email: string
}

export const MockAgency: Agency = {
  title: 'Revvify Real Estate Agency',
  location: '89 Myrtle St. New Albany, IN 47150',
  phone: '+1 425-506-2103',
  email: 'revvify@agency.com'
}
