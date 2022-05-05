import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { ButtonModule } from 'src/app/shared/ui/controls/button/button.module'
import { AgencyCardComponent } from './agency-card.component'

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SvgIconModule,
  ],
  declarations: [AgencyCardComponent],
  exports: [AgencyCardComponent]
})
export class AgencyCardModule {}