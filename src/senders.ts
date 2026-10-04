// ==========================================
// Завдання 6 - Інтерфейси як типи функцій

import { NotificationPayload, Channel } from "./payload";

// Результат відправки
export type SendResult =
  | { ok: true; messageId: string; sentAt: Date }
  | { ok: false; error: string; retryable: boolean };

// Інтерфейс з сигнатурою виклику
export interface SenderFunction {
  (payload: NotificationPayload): Promise<SendResult>;
}

// Додатково: Гібридний інтерфейс Sender (сигнатура виклику + властивості)
export interface Sender {
  (payload: NotificationPayload): Promise<SendResult>;
  channel: Channel;
  isAvailable(): boolean;
}

// функція для створення гібридного відправника
function createSender(channel: Channel): Sender {
  const fn = async (payload: NotificationPayload): Promise<SendResult> => {
    console.log(`[${channel.toUpperCase()}] Processing payload...`);
    return {
      ok: true,
      messageId: `${channel}-${Date.now()}`,
      sentAt: new Date(),
    };
  };

  return Object.assign(fn, {
    channel,
    isAvailable: () => true,
  });
}

export const emailSender: Sender = createSender("email");
export const smsSender: Sender = createSender("sms");
export const pushSender: Sender = createSender("push");

// Інтерфейс SendLogger
export interface SendLogger {
  (result: SendResult): void;
}

export const defaultLogger: SendLogger = (result) => {
  if (result.ok) {
    // Звернення до полів успіху
    console.log(`✅ Success! ID: ${result.messageId}, Sent at: ${result.sentAt.toISOString()}`);
  } else {
    // Звернення до полів помилки
    console.log(`❌ Error: ${result.error}, Retryable: ${result.retryable}`);
  }
};

export async function sendWithLogging(
  payload: NotificationPayload,
  sender: Sender,
  logger: SendLogger
): Promise<SendResult> {
  if (!sender.isAvailable()) {
    const errorResult: SendResult = {
      ok: false,
      error: `Sender ${sender.channel} is unavailable`,
      retryable: true,
    };
    logger(errorResult);
    return errorResult;
  }

  const result = await sender(payload);
  logger(result);
  return result;
}