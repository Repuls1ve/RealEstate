import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { FooterModule } from './footer/footer.module'
import { HeaderModule } from './header/header.module'
import { LayoutComponent } from './layout.component'
import { SidebarModule } from './sidebar/sidebar.module'

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    HeaderModule,
    FooterModule,
    SidebarModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}