import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AccordionModule } from '@shared/ui/accordion/accordion.module'
import { HomeBenefitsComponent } from './home-benefits.component'

@NgModule({
  imports: [CommonModule, TranslateModule, AccordionModule],
  declarations: [HomeBenefitsComponent],
  exports: [HomeBenefitsComponent]
})
export class HomeBenefitsModule {}
