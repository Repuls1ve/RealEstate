import { Component, HostBinding, Input } from '@angular/core'

export type ButtonTheme = 'contained' | 'outlined'
export type ButtonColor = 'primary' | 'secondary'

@Component({
  selector: '[shared-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public theme: ButtonTheme = 'contained'

  @Input()
  public color: ButtonColor = 'primary'

  @HostBinding('class')
  public get classes() {
    return `${this.theme} ${this.color}`
  }
}
