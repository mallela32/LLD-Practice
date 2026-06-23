// // bad/OrderService.ts
// class MySQLDatabase {
//   save(order: any) {
//     console.log(`Saving order to MySQL: ${JSON.stringify(order)}`);
//   }
// }

// class EmailNotifier {
//   notify(email: string) {
//     console.log(`Sending email to ${email}`);
//   }
// }

// class OrderService {
//   private db = new MySQLDatabase(); // ❌ tightly coupled
//   private notifier = new EmailNotifier(); // ❌ tightly coupled

//   placeOrder(order: any) {
//     this.db.save(order);
//     this.notifier.notify(order.email);
//     console.log("Order placed!");
//   }
// }
