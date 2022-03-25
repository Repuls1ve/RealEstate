import { Component, HostBinding, Input } from '@angular/core'

export type ButtonTheme = 'contained' | 'outlined'

@Component({
  selector: '[shared-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public theme: ButtonTheme = 'contained'

  @HostBinding('class')
  public get classes() {
    return this.theme
  }
}
