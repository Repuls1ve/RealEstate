import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Language } from 'src/app/core/i18n/i18n.types'
import { LanguageSwitcherStore } from './language-switcher.store'

@Component({
  selector: 'language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LanguageSwitcherStore]
})
export class LanguageSwitcherComponent {
  public readonly vm$ = this.languageSwitcherStore.vm$

  constructor(private readonly languageSwitcherStore: LanguageSwitcherStore) {}

  public useLanguage(lang: Language): void {
    this.languageSwitcherStore.useLanguage(lang)
  }
}