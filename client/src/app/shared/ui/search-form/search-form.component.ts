import { ChangeDetectionStrategy, Component, Output } from '@angular/core'
import { AbstractControl, FormBuilder } from '@angular/forms'
import { Period } from 'src/app/products/feature/product-catalog/product-catalog.store'
import { Categories } from '../../models/product.model'
import { SearchFormStatus, SearchFormStore, SearchFormValues } from './search-form.store'

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFormStore]
})
export class SearchFormComponent {
  public readonly vm$ = this.searchFormStore.vm$

  public readonly form = this.fb.group({
    period: [Period.Any],
    category: [Categories.Any],
    price: this.fb.group({
      min: [null],
      max: [null]
    })
  })

  @Output()
  public readonly search = this.searchFormStore.search$

  constructor(private readonly searchFormStore: SearchFormStore, private readonly fb: FormBuilder) {}

  public changeStatus(status: SearchFormStatus): void {
    this.searchFormStore.changeStatus(status)
  }

  public onSubmit(): void {
    this.searchFormStore.onSubmit(this.form.value as SearchFormValues)
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
