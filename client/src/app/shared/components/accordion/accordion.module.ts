import { NgModule } from '@angular/core'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { AccordionComponent } from './accordion.component'
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component'
import { ExpansionPanelTitleComponent } from './expansion-panel/expansion-panel-title/expansion-panel-title.component'
import { ExpansionPanelContentComponent } from './expansion-panel/expansion-panel-content/expansion-panel-content.component'

@NgModule({
  declarations: [
    AccordionComponent,
    ExpansionPanelComponent,
    ExpansionPanelTitleComponent,
    ExpansionPanelContentComponent
  ],
  imports: [
    AngularSvgIconModule
  ],
  exports: [
    AccordionComponent,
    ExpansionPanelComponent,
    ExpansionPanelTitleComponent,
    ExpansionPanelContentComponent
  ]
})
export class AccordionModule {}
