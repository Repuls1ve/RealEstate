import { NgModule } from '@angular/core'
import { CoreModule } from './core/core.module'
import { MainComponent } from './main.component'
import { LayoutModule } from './shared/ui/layout/layout.module'

@NgModule({
  imports: [
    CoreModule,
    LayoutModule
  ],
  declarations: [MainComponent],
  bootstrap: [MainComponent]
})
export class MainModule {}
