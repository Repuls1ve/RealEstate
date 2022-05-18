import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { HomeReviewsComponent } from './home-reviews.component'

@NgModule({
  imports: [CommonModule, SvgIconModule, ReactiveComponentModule],
  declarations: [HomeReviewsComponent],
  exports: [HomeReviewsComponent]
})
export class HomeReviewsModule {}
