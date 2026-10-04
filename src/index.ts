import { describe, NotificationPayload } from "./payload";
import { smsSender, defaultLogger, sendWithLogging } from "./senders";
import { handleIncoming } from "./validation";
import { processVendorContext } from "./domain";

async function runDemo() {
  console.log("=== 1. Перевірка валідації (Завдання 7) ===");
  
  console.log("Тест 1 (Валідно):");
  handleIncoming({ channel: "sms", to: "+380...", text: "hi", priority: "low" });

  console.log("\nТест 2 (Немає text):");
  handleIncoming({ channel: "sms", to: "+380...", priority: "low" });

  console.log("\nТест 3 (Невідомий канал):");
  handleIncoming({ channel: "carrier-pigeon", text: "hi" });

  console.log("\nТест 4 (null - перевірка на безпечність):");
  handleIncoming(null);

  console.log("\nТест 5 (Просто рядок - перевірка на безпечність):");
  handleIncoming("просто рядок");

  console.log("\n=== 2. Перевірка відправника та опису (Завдання 4, 5, 6) ===");
  const smsPayload: NotificationPayload = {
    channel: "sms",
    to: "+380501234567",
    text: "Ваш код підтвердження: 1234",
    priority: "high",
  };

  console.log("Опис сповіщення:", describe(smsPayload));
  await sendWithLogging(smsPayload, smsSender, defaultLogger);

  console.log("\n=== 3. Перевірка злиття оголошень VendorSDK (Завдання 8) ===");
  const vendorContext: VendorSDK.Context = {
    requestId: "req-999-abc",
    user: {
      id: 1,
      createdAt: new Date(),
      email: "user@vendor.com",
      role: "user",
    },
  };
  processVendorContext(vendorContext);
}

runDemo();
