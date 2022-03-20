import { NgModule } from '@angular/core'
import { CoreModule } from './core/core.module'
import { MainComponent } from './main.component'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CoreModule,
    SharedModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule {}
