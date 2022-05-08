import { Component, HostBinding, Input } from '@angular/core'

export type ButtonTheme = 'contained' | 'outlined'

export enum ButtonThemes {
  Contained = 'contained',
  Outlined = 'outlined'
}

export type ButtonColor = 'primary' | 'secondary'

export enum ButtonColors {
  Primary = 'primary',
  Secondary = 'secondary'
}

@Component({
  selector: '[shared-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public theme: ButtonTheme = ButtonThemes.Contained

  @Input()
  public color: ButtonColor = ButtonColors.Primary

  @HostBinding('class')
  public get classes() {
    return `${this.theme} ${this.color}`
  }
}
