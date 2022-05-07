import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { Period } from 'src/app/products/feature/product-catalog/product-catalog.store'
import { Category, PropertyStatus } from '../../models/product.model'
import { ButtonTheme } from '../controls/button/button.component'

export interface SearchFormParams {
  status: PropertyStatus
  period: Period | number
  category: Category
  price: Record<'min' | 'max', number | null>
}

export type SearchBranch = 'sell' | 'rent'

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  public branch: SearchBranch = 'sell'

  @Output()
  public readonly search = new EventEmitter<SearchFormParams>()

  public readonly form = this.fb.group({
    status: ['sell', Validators.required],
    period: ['any', Validators.required],
    category: ['any', Validators.required],
    price: this.fb.group({
      min: [null],
      max: [null]
    })
  })

  constructor(private readonly fb: FormBuilder) {}

  public setBranch(branch: SearchBranch): void {
    this.branch = branch
    this.status.setValue(branch)
  }

  public getTheme(current: SearchBranch): ButtonTheme {
    return this.branch == current ? 'contained' : 'outlined'
  }

  public onSubmit(): void {
    const params: SearchFormParams = {
      status: this.status.value,
      period: this.period.value == Period.Any ? this.period.value : Number(this.period.value),
      category: this.category.value,
      price: {
        min: this.price.value.min ? this.price.value.min : null,
        max: this.price.value.max ? this.price.value.max : null
      }
    }

    console.log(params)

    this.search.emit(params)
  }

  public get status(): AbstractControl {
    return this.form.get('status')!
  }

  public get period(): AbstractControl {
    return this.form.get('period')!
  }

  public get category(): AbstractControl {
    return this.form.get('category')!
  }

  public get price(): AbstractControl {
    return this.form.get('price')!
  }
}