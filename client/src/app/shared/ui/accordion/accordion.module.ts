import { NgModule } from '@angular/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { AccordionComponent } from './accordion.component'
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component'
import { ExpansionPanelTitleComponent } from './expansion-panel/expansion-panel-title/expansion-panel-title.component'
import { ExpansionPanelContentComponent } from './expansion-panel/expansion-panel-content/expansion-panel-content.component'

@NgModule({
  imports: [SvgIconModule],
  declarations: [
    AccordionComponent,
    ExpansionPanelComponent,
    ExpansionPanelTitleComponent,
    ExpansionPanelContentComponent
  ],
  exports: [AccordionComponent, ExpansionPanelComponent, ExpansionPanelTitleComponent, ExpansionPanelContentComponent]
})
export class AccordionModule {}
