import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormGroup, FormGroupDirective } from '@angular/forms'

@Component({
  selector: 'product-location-form',
  templateUrl: './product-location-form.component.html',
  styleUrls: ['./product-location-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLocationFormComponent {
  @Input()
  public formGroupName = 'location'

  public form!: FormGroup

  constructor(private readonly formGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.form = this.formGroup.control.get(this.formGroupName) as FormGroup
  }
}
