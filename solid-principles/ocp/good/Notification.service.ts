interface INotifier {
  sendNotification(message: string): void;
}
class EmailNotificationService implements INotifier {
  sendNotification(message: string) {
    console.log(`Sending EMAIL: ${message}`);
  }
}

class SMSNotificationService implements INotifier {
  sendNotification(message: string) {
    console.log(`Sending SMS: ${message}`);
  }
}

class PushNotificationService implements INotifier {
  sendNotification(message: string) {
    console.log(`Sending PUSH: ${message}`);
  }
}
export class NotificationService {
  constructor(private notifier: INotifier) {}
  send(message: string) {
    this.notifier.sendNotification(message);
  }
}

// bad/App.tsx
const emailService = new NotificationService(new EmailNotificationService());
const smsService = new NotificationService(new SMSNotificationService());
emailService.send("Welcome!");
smsService.send("Your OTP is 1234");
