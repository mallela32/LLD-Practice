export interface IMakePayment {
  makePayment(amount: number): void;
}

export interface IPaymentRefund {
  refund(amount: number): void;
}

export interface ISchedulePayment {
  scheduledPayment(amount: number, date: string): void;
}
