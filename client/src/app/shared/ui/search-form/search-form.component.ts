import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { ButtonTheme } from '../controls/button/button.component'

export interface SearchFormParams {
  status: string
  period: string
  type: string
  price: Record<'min' | 'max', string | null>
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
    period: ['0', Validators.required],
    type: ['house', Validators.required],
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
      period: this.period.value,
      type: this.type.value,
      price: this.price.value
    }

    this.search.emit(params)
  }

  public get status(): AbstractControl {
    return this.form.get('status')!
  }

  public get period(): AbstractControl {
    return this.form.get('period')!
  }

  public get type(): AbstractControl {
    return this.form.get('type')!
  }

  public get price(): AbstractControl {
    return this.form.get('price')!
  }
}