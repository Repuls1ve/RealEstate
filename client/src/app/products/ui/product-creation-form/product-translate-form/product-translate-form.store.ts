import { Injectable } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms'
import { ComponentStore } from '@ngrx/component-store'
import { filter, tap } from 'rxjs'

export enum ProductTranslateFormControls {
  Title = 'title',
  Description = 'description',
  Position = 'position',
  City = 'city',
  Area = 'area',
  Country = 'country',
  State = 'state',
  Size = 'size',
  Overviews = 'overviews'
}

export interface ProductTranslateFormState {
  readonly formGroupName: string
  readonly form?: FormGroup
}

@Injectable()
export class ProductTranslateFormStore extends ComponentStore<ProductTranslateFormState> {
  constructor(private readonly fb: FormBuilder, private readonly rootForm: FormGroupDirective) {
    super({
      formGroupName: 'translation'
    })
  }

  public readonly setForm = this.updater((state, value: NonNullable<ProductTranslateFormState['form']>) => ({
    ...state,
    form: value
  }))

  public readonly setFormGroupName = this.updater((state, value: ProductTranslateFormState['formGroupName']) => ({
    ...state,
    formGroupName: value
  }))

  public readonly form$ = this.select(state => state.form!)

  public readonly overviews$ = this.select(
    state => state.form!.get(ProductTranslateFormControls.Overviews) as FormArray
  )

  public readonly vm$ = this.select(this.form$, this.overviews$, (form, overviews) => ({
    form,
    overviews
  }))

  public readonly setupForm = this.effect(origin$ =>
    origin$.pipe(tap(() => this.setForm(this.rootForm.control.get(this.get().formGroupName) as FormGroup)))
  )

  public readonly addOverview = this.effect(origin$ =>
    origin$.pipe(
      filter(() => Boolean(this.get().form)),
      tap(() => {
        const form = this.get().form!
        const overviews = form.get(ProductTranslateFormControls.Overviews) as FormArray

        overviews.push(this.fb.control(''))
      })
    )
  )
}
