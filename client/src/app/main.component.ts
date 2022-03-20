import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'estate-app',
  template: `
    <main-layout>
      <router-outlet></router-outlet>
    </main-layout>
  `
})
export class MainComponent {
  constructor(private readonly translate: TranslateService) {
    this.translate.use('en')
  }
}
