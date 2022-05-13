import { ChangeDetectionStrategy, Component } from '@angular/core'

export interface BenefitsExpansionPanel {
  title: string
  description: string
}

export type BenefitsAccordion = BenefitsExpansionPanel[]

@Component({
  selector: 'home-benefits',
  templateUrl: './home-benefits.component.html',
  styleUrls: ['./home-benefits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBenefitsComponent {
  public readonly accordion: BenefitsAccordion = [
    {
      title: 'components.home-benefits.accordion.warranty.title',
      description: 'components.home-benefits.accordion.warranty.description'
    },
    {
      title: 'components.home-benefits.accordion.cheap.title',
      description: 'components.home-benefits.accordion.cheap.description'
    },
    {
      title: 'components.home-benefits.accordion.location.title',
      description: 'components.home-benefits.accordion.location.description'
    },
    {
      title: 'components.home-benefits.accordion.tax.title',
      description: 'components.home-benefits.accordion.tax.description'
    }
  ] 
}