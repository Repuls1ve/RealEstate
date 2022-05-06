import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { TimesPipeModule } from 'src/app/shared/pipes/times/times.module'
import { ProductInfoComponent } from './product-info.component'

@NgModule({
  imports: [
    CommonModule,
    SvgIconModule,
    TranslateModule,
    TimesPipeModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [ProductInfoComponent],
  exports: [ProductInfoComponent]
})
export class ProductInfoModule {}