import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { LanguageSwitcherComponent } from './language-switcher.component'

@NgModule({
  imports: [CommonModule, ReactiveComponentModule],
  declarations: [LanguageSwitcherComponent],
  exports: [LanguageSwitcherComponent]
})
export class LanguageSwitcherModule {}
