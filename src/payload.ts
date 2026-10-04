// ==========================================
// Завдання 10 — Похідний union (Channel)

export const CHANNELS = ["email", "sms", "push", "telegram"] as const;
export type Channel = (typeof CHANNELS)[number];
// Автоматично виводить: "email" | "sms" | "push" | "telegram"

// ==========================================
// Завдання 4 — Дискриміноване об'єднання

export type Priority = "low" | "normal" | "high";

export type EmailPayload = {
  channel: "email";
  to: string;
  subject: string;
  body: string;
  attachments?: readonly string[];
  priority: Priority;
};

export type SmsPayload = {
  channel: "sms";
  to: string;
  text: string;
  priority: Priority;
};

export type PushPayload = {
  channel: "push";
  deviceToken: string;
  title: string;
  body: string;
  badge?: number;
  priority: Priority;
};

// ==========================================
// Завдання 5: Четвертий варіант Telegram

export type TelegramPayload = {
  channel: "telegram";
  chatId: string;
  text: string;
  priority: Priority;
};

export type NotificationPayload =
  | EmailPayload
  | SmsPayload
  | PushPayload
  | TelegramPayload;

// ==========================================
// Завдання 4 & 5 — Опис payloads та exhaustiveness check (never)

export function describe(payload: NotificationPayload): string {
  switch (payload.channel) {
    case "email":
      return `[Email to: ${payload.to}] Subject: ${payload.subject}, Body: ${payload.body}`;

    case "sms":
      /*
      // Спроба звернутися до subject для SMS:
      console.log(payload.subject);
      // Помилка компіляції: Property 'subject' does not exist on type 'SmsPayload'.
      */
      return `[SMS to: ${payload.to}] Text: ${payload.text}`;

    case "push":
      return `[Push token: ${payload.deviceToken}] Title: ${payload.title}, Body: ${payload.body}`;

    case "telegram":
      return `[Telegram chatId: ${payload.chatId}] Text: ${payload.text}`;

    default: {
      // Завдання 5 — Гарантія повноти обробки типів
      const exhaustive: never = payload;
      throw new Error(`Невідомий канал: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/*
// Помилка, якщо прибрати гілку "telegram" зі switch:
// Type 'TelegramPayload' is not assignable to type 'never'.
// (не всі варіанти Union розібрано)
*/