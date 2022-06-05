import { ChangeDetectionStrategy, Component } from '@angular/core'

export interface BenefitsExpansionPanel {
  readonly title: string
  readonly description: string
}

@Component({
  selector: 'app-home-benefits',
  templateUrl: './home-benefits.component.html',
  styleUrls: ['./home-benefits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBenefitsComponent {
  public readonly accordion: BenefitsExpansionPanel[] = [
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
