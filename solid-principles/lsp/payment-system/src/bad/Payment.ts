// bad/Payment.ts
class Payment {
  makePayment(amount: number) {
    console.log(`Processing payment of ${amount}`);
  }

  refund(amount: number) {
    console.log(`Refunding ${amount}`);
  }

  scheduledPayment(amount: number, date: string) {
    console.log(`Scheduling payment of ${amount} on ${date}`);
  }
}

class CreditCardPayment extends Payment {
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

class CryptoPayment extends Payment {
  makePayment(amount: number) {
    console.log(`Paying ${amount} via Crypto`);
  }

  refund(amount: number) {
    throw new Error("Crypto payments cannot be refunded!"); // 💥
  }

  scheduledPayment(amount: number, date: string) {
    throw new Error("Crypto payments cannot be scheduled!"); // 💥
  }
}
