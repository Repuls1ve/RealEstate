import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { Language, LanguageT } from '@shared/enums/language.enum'
import { map, Observable, tap } from 'rxjs'

@Injectable()
export class LanguageSwitcherStore extends ComponentStore<{}> {
  constructor(private readonly translate: TranslateService) {
    super({})
  }

  public readonly vm$ = this.translate.onLangChange.pipe(
    map(event => ({
      [Language.En]: event.lang === Language.En,
      [Language.Ru]: event.lang === Language.Ru
    }))
  )

  public readonly useLanguage = this.effect((lang$: Observable<LanguageT>) =>
    lang$.pipe(tap(lang => this.translate.use(lang)))
  )
}
