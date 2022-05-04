import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { AngularSvgIconModule as SvgIconModule } from 'angular-svg-icon'
import { PaginatorComponent } from './paginator.component'

@NgModule({
  imports: [
    CommonModule,
    SvgIconModule,
    ReactiveComponentModule
  ],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent]
})
export class PaginatorModule {}