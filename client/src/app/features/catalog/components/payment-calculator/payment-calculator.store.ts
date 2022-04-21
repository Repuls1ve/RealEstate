import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { TranslateService } from '@ngx-translate/core'
import { SingleSeries } from '@swimlane/ngx-charts'
import { concat, switchMap, tap } from 'rxjs'
import { MortgagePaymentParams, PaymentCalculationHelper } from 'src/app/shared/helpers/payment-calculation/payment-calculation.helper'

export interface PaymentCalculationParams extends MortgagePaymentParams {
  insurance: number
  tax: number
}

export interface PaymentCalculatorState {
  results: SingleSeries
}

@Injectable()
export class PaymentCalculatorStore extends ComponentStore<PaymentCalculatorState> {
  constructor(private readonly translate: TranslateService) {
    super({
      results: []
    })
  }

  public readonly setResults = this.updater((state, value: SingleSeries) => ({
    ...state,
    results: value
  }))

  public readonly vm$ = this.select(state => state)

  public readonly subscribeTo = this.effect<unknown>($ => $)

  public readonly calculatePayment = this.effect<PaymentCalculationParams>(params$ => params$.pipe(
    tap(params => this.setResults([
      {
        name: this.translate.instant('payment-calculator.chart.principal'),
        value: PaymentCalculationHelper.calculateMortgagePayment(params)
      },
      {
        name: this.translate.instant('payment-calculator.chart.insurance'),
        value: params.insurance
      },
      {
        name: this.translate.instant('payment-calculator.chart.tax'),
        value: params.tax
      }
    ]))
  ))
}