import { HttpClient } from '@angular/common/http'
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => {
  return new TranslateHttpLoader(http)
}

export const TranslateConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
}