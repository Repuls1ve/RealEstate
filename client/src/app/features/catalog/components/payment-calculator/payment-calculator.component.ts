import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { tap } from 'rxjs'
import { PaymentCalculationParams, PaymentCalculatorStore } from './payment-calculator.store'

@Component({
  selector: 'payment-calculator',
  templateUrl: './payment-calculator.component.html',
  styleUrls: ['./payment-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaymentCalculatorStore]
})
export class PaymentCalculatorComponent implements OnInit {
  public readonly vm$ = this.paymentCalculatorStore.vm$

  public readonly form = this.fb.group({
    total: [100000, [Validators.required, Validators.min(0)]],
    term: [10, [Validators.required, Validators.min(1)]],
    interest: [5.1, [Validators.required, Validators.min(0)]],
    insurance: [70, [Validators.required, Validators.min(0)]],
    deposit: [12000, [Validators.required, Validators.min(0)]],
    tax: [225, [Validators.required, Validators.min(0)]]
  })

  constructor(
    private readonly paymentCalculatorStore: PaymentCalculatorStore,
    private readonly translate: TranslateService,
    private readonly fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.watchLanguageChange()
    this.calculatePayment()
  }

  public calculatePayment(): void {
    this.paymentCalculatorStore.calculatePayment(this.calculationParams)
  }

  private watchLanguageChange(): void {
    const onLanguageChange$ = this.translate.onLangChange.pipe(
      tap(() => this.calculatePayment())
    )
    this.paymentCalculatorStore.subscribeTo(onLanguageChange$)
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

  private get calculationParams(): PaymentCalculationParams {
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
