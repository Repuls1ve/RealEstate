export interface MortgagePaymentParams {
  total: number
  term: number
  deposit: number
  interest: number
}

export class PaymentCalculator {
  public static calculateMortgage(params: MortgagePaymentParams): number {
    const {
      interest: yearlyInterest,
      term: years,
      total,
      deposit
    } = params

    const term = years * 12
    const interest = yearlyInterest / 12 / 100
    const principal = total - deposit
    const payment = principal * (interest * Math.pow(1 + interest, term)) / ((Math.pow(1 + interest, term) - 1))
    
    return payment
  }
}