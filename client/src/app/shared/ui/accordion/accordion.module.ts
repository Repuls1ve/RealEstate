import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { AccordionItemContentDirective } from './accordion-item/accordion-item-content.directive'
import { AccordionItemComponent } from './accordion-item/accordion-item.component'
import { AccordionComponent } from './accordion.component'

@NgModule({
  imports: [CommonModule, SvgIconModule],
  declarations: [AccordionComponent, AccordionItemComponent, AccordionItemContentDirective],
  exports: [AccordionComponent, AccordionItemComponent, AccordionItemContentDirective]
})
export class AccordionModule {}
