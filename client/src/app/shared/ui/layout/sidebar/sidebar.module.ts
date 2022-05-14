import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { LanguageSwitcherModule } from '@shared/ui/language-switcher/language-switcher.module'
import { SidebarComponent } from './sidebar.component'

@NgModule({
  imports: [CommonModule, RouterModule, SvgIconModule, TranslateModule, LanguageSwitcherModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class SidebarModule {}
