import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { LayoutComponent } from './components/layout/layout.component'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SelectLanguageComponent } from './components/select-language/select-language.component'
import { SearchFormComponent } from './components/search-form/search-form.component'
import { FooterComponent } from './components/footer/footer.component'
import { ButtonComponent } from './components/button/button.component'
import { SelectComponent } from './components/controls/select/select.component'
import { TextFieldComponent } from './components/controls/text-field/text-field.component'
import { TextAreaComponent } from './components/controls/text-area/text-area.component'

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
    TextAreaComponent
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
    TextAreaComponent
  ]
})
export class SharedModule {}
