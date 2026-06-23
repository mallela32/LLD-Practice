// bad/NotificationService.ts
export class NotificationService {
  sendNotification(type: string, message: string) {
    if (type === "email") {
      console.log(`Sending EMAIL: ${message}`);
    } else if (type === "sms") {
      console.log(`Sending SMS: ${message}`);
    } else if (type === "push") {
      console.log(`Sending PUSH: ${message}`);
    }
  }
}

// bad/App.tsx
const service = new NotificationService();
service.sendNotification("email", "Welcome!");
service.sendNotification("sms", "Your OTP is 1234");
