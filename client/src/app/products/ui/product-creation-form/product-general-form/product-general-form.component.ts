import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms'
import { AgencySearchEvent, ProductGeneralFormStore } from './product-general-form.store'

@Component({
  selector: 'product-general-form',
  templateUrl: './product-general-form.component.html',
  styleUrls: ['./product-general-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductGeneralFormStore]
})
export class ProductGeneralFormComponent {
  public readonly vm$ = this.productGeneralFormStore.vm$

  public form!: FormGroup

  @Input()
  public formGroupName = 'general'

  constructor(
    private readonly fb: FormBuilder,
    private readonly formGroup: FormGroupDirective,
    private readonly productGeneralFormStore: ProductGeneralFormStore
  ) {}

  public ngOnInit(): void {
    this.form = this.formGroup.control.get(this.formGroupName) as FormGroup
  }

  public onAgencySearch(event: AgencySearchEvent): void {
    this.productGeneralFormStore.onAgencySearch(event)
  }

  public addOverview(): void {
    this.overviews.push(this.fb.control(''))
  }

  public get overviews(): FormArray {
    return this.form.get('overviews') as FormArray
  }
}
