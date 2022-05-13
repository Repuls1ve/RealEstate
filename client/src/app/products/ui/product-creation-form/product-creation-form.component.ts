import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Categories, PropertyStatuses } from '@shared/models/product.model'
import { Step } from '@shared/ui/stepper/stepper.store'
import { ProductCreationFormStore, ProductCreationFormValues } from './product-creation-form.store'

export const ProductCreationFormSteps: Step[] = [
  {
    id: 1,
    label: 'General',
    isActive: true
  },
  {
    id: 2,
    label: 'Location',
    isActive: false
  },
  {
    id: 3,
    label: 'Translate',
    isActive: false
  }
]

@Component({
  selector: 'product-creation-form',
  templateUrl: './product-creation-form.component.html',
  styleUrls: ['./product-creation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductCreationFormStore]
})
export class ProductCreationFormComponent implements OnInit {
  public readonly vm$ = this.productCreationFormStore.vm$

  public readonly form = this.fb.group({
    uid: [null, Validators.required],
    title: [null, Validators.required],
    description: [null, Validators.required],
    price: [null, Validators.required],
    size: [null, Validators.required],
    year: [null, Validators.required],
    category: [Categories.Apartments, Validators.required],
    status: [PropertyStatuses.Sell, Validators.required],
    position: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    zip: [null, Validators.required],
    area: [null, Validators.required],
    country: [null, Validators.required],
    agency: [null, Validators.required],
    translation: this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      size: [null, Validators.required],
      position: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      area: [null, Validators.required],
      country: [null, Validators.required],
      overview: this.fb.array([])
    }),
    overview: this.fb.array([])
  })

  @Output()
  public readonly create = this.productCreationFormStore.create$

  constructor(
    private readonly productCreationFormStore: ProductCreationFormStore,
    private readonly fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.setSteps(ProductCreationFormSteps)
  }

  public setSteps(steps: Step[]): void {
    this.productCreationFormStore.setSteps(steps)
  }

  public nextStep(): void {
    this.productCreationFormStore.nextStep()
  }

  public addOverview(): void {
    this.overview.push(this.fb.control(''))
  }

  public onSubmit(): void {
    this.form.reset()
    this.productCreationFormStore.onSubmit(this.form.value as ProductCreationFormValues)
  }

  public get overview(): FormArray {
    return this.form.controls['overview'] as FormArray
  }
}