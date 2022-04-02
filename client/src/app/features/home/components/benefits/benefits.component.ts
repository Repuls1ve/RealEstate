import { Component } from '@angular/core'

export interface BenefitsExpansionPanel {
  title: string
  description: string
}

export type BenefitsAccordion = BenefitsExpansionPanel[]

@Component({
  selector: 'home-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent {
  public readonly accordion: BenefitsAccordion = [
    {
      title: 'home.benefits.accordion.warranty.title',
      description: 'home.benefits.accordion.warranty.description'
    },
    {
      title: 'home.benefits.accordion.cheap.title',
      description: 'home.benefits.accordion.cheap.description'
    },
    {
      title: 'home.benefits.accordion.location.title',
      description: 'home.benefits.accordion.location.description'
    },
    {
      title: 'home.benefits.accordion.tax.title',
      description: 'home.benefits.accordion.tax.description'
    }
  ] 
}
