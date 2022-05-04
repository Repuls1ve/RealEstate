import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxMaskModule } from 'ngx-mask'
import { CoreRoutingModule } from './core-routing.module'
import { TranslateConfig } from './i18n/i18n.config'

@NgModule({
  imports: [
    TranslateModule.forRoot(TranslateConfig),
    NgxMaskModule.forRoot(),
    SvgIconModule.forRoot()
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreRoutingModule
  ]
})
export class CoreModule {}