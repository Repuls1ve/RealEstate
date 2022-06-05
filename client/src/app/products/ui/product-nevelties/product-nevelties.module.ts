import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveComponentModule } from '@ngrx/component'
import { TranslateModule } from '@ngx-translate/core'
import { TimesPipeModule } from '@shared/pipes/times/times.module'
import { ButtonModule } from '@shared/ui/button/button.module'
import { ProductCardModule } from '../product-card/product-card.module'
import { ProductNeveltiesComponent } from './product-nevelties.component'

@NgModule({
  imports: [CommonModule, ButtonModule, TranslateModule, TimesPipeModule, ProductCardModule, ReactiveComponentModule],
  declarations: [ProductNeveltiesComponent],
  exports: [ProductNeveltiesComponent]
})
export class ProductNeveltiesModule {}
