import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ButtonAppearance, ButtonAppearanceT } from '@shared/enums/button-appearance.enum'
import { Category, CategoryT } from '@shared/enums/category.enum'
import { Period, PeriodT } from '@shared/enums/period.enum'
import { PropertyStatus, PropertyStatusT } from '@shared/enums/property-status.enum'
import { PriceRange } from '@shared/types/price-range.type'

/**
 * Product search event object that is emitted
 * when the user submits a valid search form
 */
export interface ProductSearchEvent {
  /**
   * Allowed product status
   */
  readonly status: PropertyStatusT

  /**
   * Allowed product category
   */
  readonly category: CategoryT

  /**
   * Publication period
   */
  readonly period: PeriodT

  /**
   * Price range
   */
  readonly price: PriceRange
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchComponent {
  public readonly form = this.fb.group({
    status: [PropertyStatus.Sell, Validators.required],
    period: [Period.AllTime, Validators.required],
    category: [Category.Any, Validators.required],
    price: this.fb.group({ min: [null], max: [null] })
  })

  @Output()
  public readonly search = new EventEmitter<ProductSearchEvent>()

  constructor(private readonly fb: FormBuilder) {}

  public onSubmit(): void {
    this.search.emit(this.form.value)
  }

  public changeStatus(status: PropertyStatusT): void {
    this.status.setValue(status)
  }

  public getAppearance(target: PropertyStatusT): ButtonAppearanceT {
    return this.status.value === target ? ButtonAppearance.Contained : ButtonAppearance.Outlined
  }

  public get status(): FormControl {
    return this.form.get('status') as FormControl
  }

  public get period(): FormControl {
    return this.form.get('period') as FormControl
  }

  public get category(): FormControl {
    return this.form.get('category') as FormControl
  }

  public get price(): FormControl {
    return this.form.get('price') as FormControl
  }
}
