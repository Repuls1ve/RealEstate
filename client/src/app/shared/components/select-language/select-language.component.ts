import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Language } from 'src/app/core/translations/translations.config'

@Component({
  selector: 'select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent {

  constructor(private readonly translate: TranslateService) {}

  public useLanguage(language: Language): void {
    this.translate.use(language)
  }

  public isLanguageActive(language: Language): boolean {
    return this.translate.currentLang === language
  }
}
