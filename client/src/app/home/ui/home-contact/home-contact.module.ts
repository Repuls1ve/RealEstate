import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from '@shared/ui/controls/button/button.module'
import { HomeContactComponent } from './home-contact.component'

@NgModule({
  imports: [CommonModule, TranslateModule, ButtonModule],
  declarations: [HomeContactComponent],
  exports: [HomeContactComponent]
})
export class HomeContactModule {}
