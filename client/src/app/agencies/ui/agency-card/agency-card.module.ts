import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { TimesPipeModule } from '@shared/pipes/times/times.module'
import { ButtonModule } from '@shared/ui/button/button.module'
import { AgencyCardComponent } from './agency-card.component'

@NgModule({
  imports: [CommonModule, ButtonModule, SvgIconModule, TranslateModule, TimesPipeModule, NgxSkeletonLoaderModule],
  declarations: [AgencyCardComponent],
  exports: [AgencyCardComponent]
})
export class AgencyCardModule {}
