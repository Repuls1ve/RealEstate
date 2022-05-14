import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { FooterComponent } from './footer.component'

@NgModule({
  imports: [CommonModule, SvgIconModule, TranslateModule],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule {}
