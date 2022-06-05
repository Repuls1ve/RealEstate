import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core'
import { ButtonAppearance, ButtonAppearanceT } from '@shared/enums/button-appearance.enum'
import { ButtonColor, ButtonColorT } from '@shared/enums/button-color.enum'
import { ButtonSize, ButtonSizeT } from '@shared/enums/button-size.enum'

@Component({
  selector: 'button[appButton], a[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input()
  public appearance: ButtonAppearanceT = ButtonAppearance.Contained

  @Input()
  public size: ButtonSizeT = ButtonSize.Small

  @Input()
  public color: ButtonColorT = ButtonColor.Primary

  @Input()
  public showLoader = false

  @HostBinding('class')
  public get classes(): string {
    return `${this.appearance} ${this.size} ${this.color} ${this.showLoader ? 'show-loader' : 'no-loader'}`
  }
}
