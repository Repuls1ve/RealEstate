import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Category } from '@shared/enums/category.enum'
import { PropertyStatus } from '@shared/enums/property-status.enum'
import { Step, StepEvent } from '@shared/ui/stepper/stepper.store'
import { ProductCreationFormStore, ProductCreationFormValues } from './product-creation-form.store'

export const ProductCreationFormSteps: Step[] = [
  {
    id: 1,
    label: 'General'
  },
  {
    id: 2,
    label: 'Location'
  },
  {
    id: 3,
    label: 'Photos'
  }
]

@Component({
  selector: 'app-product-creation-form',
  templateUrl: './product-creation-form.component.html',
  styleUrls: ['./product-creation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCreationFormStore]
})
export class ProductCreationFormComponent implements OnInit {
  public readonly vm$ = this.productCreationFormStore.vm$

  public readonly form = this.fb.group({
    general: this.fb.group({
      uid: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      size: [null, Validators.required],
      year: [null, Validators.required],
      category: [Category.Apartments, Validators.required],
      status: [PropertyStatus.Sell, Validators.required],
      agency: [null, Validators.required],
      overviews: this.fb.array([]),
      files: [[]]
    }),
    location: this.fb.group({
      position: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      area: [null, Validators.required],
      country: [null, Validators.required]
    })
  })

  @Output()
  public readonly create = this.productCreationFormStore.create$

  constructor(private readonly productCreationFormStore: ProductCreationFormStore, private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.setSteps(ProductCreationFormSteps)
  }

  public setSteps(steps: Step[]): void {
    this.productCreationFormStore.setSteps(steps)
  }

  public onStepChange(event: StepEvent): void {
    this.productCreationFormStore.onStepChange(event)
  }

  public onSubmit(): void {
    this.form.reset()
    this.productCreationFormStore.onSubmit(this.form.value as ProductCreationFormValues)
  }

  public get general(): FormGroup {
    return this.form.get('general') as FormGroup
  }

  public get location(): FormGroup {
    return this.form.get('location') as FormGroup
  }
}
