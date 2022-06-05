import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LanguageT } from '@shared/enums/language.enum'
import { LanguageSwitcherStore } from './language-switcher.store'

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LanguageSwitcherStore]
})
export class LanguageSwitcherComponent {
  public readonly vm$ = this.languageSwitcherStore.vm$

  constructor(private readonly languageSwitcherStore: LanguageSwitcherStore) {}

  public useLanguage(lang: LanguageT): void {
    this.languageSwitcherStore.useLanguage(lang)
  }
}
