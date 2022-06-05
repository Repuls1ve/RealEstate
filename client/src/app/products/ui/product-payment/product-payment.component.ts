import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { tap } from 'rxjs'
import { ProductPaymentParams, ProductPaymentStore } from './product-payment.store'

@Component({
  selector: 'app-product-payment',
  templateUrl: './product-payment.component.html',
  styleUrls: ['./product-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductPaymentStore]
})
export class ProductPaymentComponent implements OnInit {
  public readonly vm$ = this.productPaymentStore.vm$

  public readonly form = this.fb.group({
    total: [100000, [Validators.required, Validators.min(0)]],
    term: [10, [Validators.required, Validators.min(1)]],
    interest: [5.1, [Validators.required, Validators.min(0)]],
    insurance: [70, [Validators.required, Validators.min(0)]],
    deposit: [12000, [Validators.required, Validators.min(0)]],
    tax: [225, [Validators.required, Validators.min(0)]]
  })

  constructor(
    private readonly productPaymentStore: ProductPaymentStore,
    private readonly translate: TranslateService,
    private readonly fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.observeLanguageChange()
    this.calculatePayment()
  }

  public calculatePayment(): void {
    this.productPaymentStore.calculatePayment(this.calculationParams)
  }

  private observeLanguageChange(): void {
    const onLanguageChange$ = this.translate.onLangChange.pipe(tap(() => this.calculatePayment()))
    this.productPaymentStore.subscribeTo(onLanguageChange$)
  }

  public get total(): AbstractControl {
    return this.form.get('total')!
  }

  public get term(): AbstractControl {
    return this.form.get('term')!
  }

  public get insurance(): AbstractControl {
    return this.form.get('insurance')!
  }

  public get deposit(): AbstractControl {
    return this.form.get('deposit')!
  }

  public get interest(): AbstractControl {
    return this.form.get('interest')!
  }

  public get tax(): AbstractControl {
    return this.form.get('tax')!
  }

  private get calculationParams(): ProductPaymentParams {
    return {
      total: this.total.value,
      deposit: this.deposit.value,
      insurance: this.insurance.value,
      interest: this.interest.value,
      term: this.term.value,
      tax: this.tax.value
    }
  }
}
