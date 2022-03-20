import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module'
import { CatalogRoutingModule } from './routing/catalog-routing.module'
import { CatalogComponent } from './views/catalog/catalog.component'

@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CatalogRoutingModule,
    SharedModule
  ]
})
export class CatalogModule {}
