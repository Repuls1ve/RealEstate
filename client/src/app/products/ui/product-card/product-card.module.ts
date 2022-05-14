import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { ProductCardComponent } from './product-card.component'

@NgModule({
  imports: [CommonModule, RouterModule, SvgIconModule, NgxSkeletonLoaderModule],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent]
})
export class ProductCardModule {}
