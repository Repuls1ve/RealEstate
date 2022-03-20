import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { CoreRoutingModule } from './routing/core-routing.module'
import { CoreStoreModule } from './store/core-store.module'
import { TranslationsConfig } from './translations/translations.config'

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot(TranslationsConfig),
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreStoreModule,
    CoreRoutingModule
  ]
})
export class CoreModule {}
