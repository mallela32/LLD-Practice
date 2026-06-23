// bad/OrderService.ts
interface IDatabase {
  save(order: any): void;
}

interface INotifier {
  notify(email: string): void;
}

class MySQLDatabase implements IDatabase {
  save(order: any) {
    console.log(`Saving order to MySQL: ${JSON.stringify(order)}`);
  }
}

class EmailNotifier implements INotifier {
  notify(email: string) {
    console.log(`Sending email to ${email}`);
  }
}

class OrderService {
  constructor(
    private db: IDatabase,
    private notifier: INotifier,
  ) {}

  placeOrder(order: any) {
    this.db.save(order);
    this.notifier.notify(order.email);
    console.log("Order placed!");
  }
}

const orderService = new OrderService(new MySQLDatabase(), new EmailNotifier());
