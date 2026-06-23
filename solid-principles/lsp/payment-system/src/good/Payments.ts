import {
  IMakePayment,
  IPaymentRefund,
  ISchedulePayment,
} from "../interfaces/payment.interface";

export class CreditCardPayment
  implements IMakePayment, IPaymentRefund, ISchedulePayment
{
  makePayment(amount: number) {
    console.log(`Paying ${amount} via Credit Card`);
  }

  refund(amount: number) {
    console.log(`Refunding ${amount} to Credit Card`);
  }

  scheduledPayment(amount: number, date: string) {
    console.log(`Scheduling credit card payment of ${amount} on ${date}`);
  }
}

export class CryptoPayment implements IMakePayment {
  makePayment(amount: number) {
    console.log(`Paying ${amount} via Crypto`);
  }
}
