import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxMaskModule } from 'ngx-mask'
import { ButtonModule } from '@shared/ui/button/button.module'
import { InputModule } from '@shared/ui/input/input.module'
import { ProductSearchComponent } from './product-search.component'

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ButtonModule,
    SvgIconModule,
    NgxMaskModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [ProductSearchComponent],
  exports: [ProductSearchComponent]
})
export class ProductSearchModule {}
