import { CryptoPayment } from "./good/Payments";
import { IMakePayment, IPaymentRefund } from "./interfaces/payment.interface";

function processPayment(payment: IMakePayment, amount: number) {
  payment.makePayment(amount);
}

function processRefund(payment: IPaymentRefund, amount: number) {
  payment.refund(amount);
}

processPayment(new CreditCardPayment(), 100);
processPayment(new CryptoPayment(), 100);
processRefund(new CreditCardPayment(), 100);
