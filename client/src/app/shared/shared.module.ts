import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { HeaderComponent } from './components/header/header.component'
import { LayoutComponent } from './components/layout/layout.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SelectLanguageComponent } from './components/select-language/select-language.component'
import { SearchFormComponent } from './components/search-form/search-form.component'
import { FooterComponent } from './components/footer/footer.component'
import { ButtonComponent } from './components/button/button.component'
import { SelectComponent } from './components/controls/select/select.component'
import { TextFieldComponent } from './components/controls/text-field/text-field.component'
import { TextAreaComponent } from './components/controls/text-area/text-area.component'
import { NewestListingsComponent } from './components/newest-listings/newest-listings.component'
import { ProductCardComponent } from './components/product-card/product-card.component'
import { TimesPipe } from './pipes/times/times.pipe'

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    SelectLanguageComponent,
    SearchFormComponent,
    FooterComponent,
    ButtonComponent,
    SelectComponent,
    TextFieldComponent,
    TextAreaComponent,
    NewestListingsComponent,
    ProductCardComponent,
    TimesPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    TranslateModule,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    SelectLanguageComponent,
    SearchFormComponent,
    ButtonComponent,
    SelectComponent,
    TextFieldComponent,
    TextAreaComponent,
    NewestListingsComponent,
    TimesPipe
  ]
})
export class SharedModule {}
