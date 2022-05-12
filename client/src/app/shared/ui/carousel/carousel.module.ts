import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { CarouselComponent } from './carousel.component'

@NgModule({
  imports: [
    CommonModule,
    SvgIconModule,
    ReactiveComponentModule
  ],
  declarations: [CarouselComponent],
  exports: [CarouselComponent]
})
export class CarouselModule {}