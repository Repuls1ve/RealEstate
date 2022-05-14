import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { TimesPipeModule } from '@shared/pipes/times/times.module'
import { CarouselModule } from '@shared/ui/carousel/carousel.module'
import { ProductInfoComponent } from './product-info.component'

@NgModule({
  imports: [CommonModule, SvgIconModule, CarouselModule, TranslateModule, TimesPipeModule, NgxSkeletonLoaderModule],
  declarations: [ProductInfoComponent],
  exports: [ProductInfoComponent]
})
export class ProductInfoModule {}
