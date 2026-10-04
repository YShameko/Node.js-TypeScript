// ==========================================
// Завдання 7 - Валідація без any

import { NotificationPayload, CHANNELS, Priority } from "./payload";

// Допоміжні функції-предикати типів
function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

function isString(val: unknown): val is string {
  return typeof val === "string";
}

function isNumber(val: unknown): val is number {
  return typeof val === "number";
}

function isPriority(val: unknown): val is Priority {
  return val === "low" || val === "normal" || val === "high";
}

export function isNotificationPayload(value: unknown): value is NotificationPayload {
  if (!isObject(value)) return false;

  const { channel, priority } = value;

  if (!isString(channel) || !(CHANNELS as readonly string[]).includes(channel)) {
    return false;
  }

  if (!isPriority(priority)) {
    return false;
  }

  switch (channel) {
    case "email":
      return (
        isString(value.to) &&
        isString(value.subject) &&
        isString(value.body) &&
        (value.attachments === undefined || Array.isArray(value.attachments))
      );

    case "sms":
      return isString(value.to) && isString(value.text);

    case "push":
      return (
        isString(value.deviceToken) &&
        isString(value.title) &&
        isString(value.body) &&
        (value.badge === undefined || isNumber(value.badge))
      );

    case "telegram":
      return isString(value.chatId) && isString(value.text);

    default:
      return false;
  }
}

export function handleIncoming(raw: unknown): void {
  if (isNotificationPayload(raw)) {
    // Після перевірки предикатом TypeScript точно знає тип NotificationPayload
    console.log("Valid payload received:", raw.channel);
  } else {
    console.log("Invalid payload structure!");
  }
}