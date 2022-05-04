import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Languages } from './core/i18n/i18n.types'

@Component({
  selector: 'estate-app',
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `
})
export class MainComponent implements OnInit {
  constructor(private readonly translate: TranslateService) {}

  public ngOnInit(): void {
    this.setDefaultLanguage()
  }

  private setDefaultLanguage(): void {
    this.translate.use(Languages.en)
  }
}