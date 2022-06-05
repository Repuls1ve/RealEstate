import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms'
import { FileLike } from '@app/shared/interfaces/file-like.interface'
import { AgencySearchEvent, ProductGeneralFormStore } from './product-general-form.store'

@Component({
  selector: 'app-product-general-form',
  templateUrl: './product-general-form.component.html',
  styleUrls: ['./product-general-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductGeneralFormStore]
})
export class ProductGeneralFormComponent {
  public readonly vm$ = this.productGeneralFormStore.vm$

  public rejectedFiles: FileLike[] = []

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

  public onReject(file: FileLike): void {
    this.rejectedFiles = [...this.rejectedFiles, file]
  }

  public get overviews(): FormArray {
    return this.form.get('overviews') as FormArray
  }

  public get files(): FormControl {
    return this.form.get('files') as FormControl
  }
}
