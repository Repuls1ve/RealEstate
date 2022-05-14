import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { map, Observable, tap } from 'rxjs'
import { Language, Languages } from '@core/i18n/i18n.types'

@Injectable()
export class LanguageSwitcherStore extends ComponentStore<{}> {
  constructor(private readonly translate: TranslateService) {
    super({})
  }

  public readonly vm$ = this.translate.onLangChange.pipe(
    map(event => ({
      [Languages.en]: event.lang == Languages.en,
      [Languages.ru]: event.lang == Languages.ru
    }))
  )

  public readonly useLanguage = this.effect((lang$: Observable<Language>) =>
    lang$.pipe(tap(lang => this.translate.use(lang)))
  )
}
