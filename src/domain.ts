// ==========================================
// Завдання 1 — Модель користувача

export type UserRole = "admin" | "user" | "guest";

export interface User {
  readonly id: number;
  readonly createdAt: Date;
  email: string;
  phone?: string;
  role: UserRole;
  preferences?: {
    emailEnabled?: boolean;
    smsEnabled?: boolean;
  };
}

// об'єкт admin, усі поля заповнені
export const admin: User = {
  id: 1,
  createdAt: new Date("2026-09-09"),
  email: "admin@system.com",
  phone: "+380501234567",
  role: "admin",
  preferences: {
    emailEnabled: true,
    smsEnabled: true,
  },
};

// Об'єкт guest, тільки обов'язкові поля
export const guest: User = {
  id: 2,
  createdAt: new Date("2026-09-10"),
  email: "guest@system.com",
  role: "guest",
};

/*
// Три рядки, які не скомпілюються (закоментовано з помилками):

admin.id = 100;
// Помилка: Cannot assign to 'id' because it is a read-only property.

admin.createdAt = new Date();
// Помилка: Cannot assign to 'createdAt' because it is a read-only property.

admin.role = "superadmin";
// Помилка: Type '"superadmin"' is not assignable to type 'UserRole'.
*/

// ==========================================
// Завдання 2 — Розширення Admin

export interface Admin extends User {
  readonly permissions: readonly string[]; // Неможливість мутувати масив (push відсутній)
  role: "admin"; // Звуження до літерального типу
}

// ==========================================
// Завдання 3 — Перетин і never

type WithStringId = { id: string; label: string };
type WithNumberId = { id: number; count: number };
type Broken = WithStringId & WithNumberId;

/*
// Спроба створити змінну типу Broken:
const brokenItem: Broken = { id: 1, label: "Test", count: 5 };
// Помилка:
// Type 'number' is not assignable to type 'never'.
// The string & number type 'string & number' reduces to 'never'.
// (Поле id у типів string і number перетинається в never, оскільки значення не може бути одночасно string і number)
*/

// Безпечне об'єднання типів SafeMerge (поля з другого T2 перекривають поля з першого T1)
export type SafeMerge<T1, T2> = Omit<T1, keyof T2> & T2;

export type FixedIdType = SafeMerge<WithStringId, WithNumberId>;
// Результат: { label: string; id: number; count: number }

// ==========================================
// Завдання 9 — Пастка структурної типізації (Branded Types)

declare const __brand: unique symbol;

export type Brand<T, B> = T & { readonly [__brand]: B };

export type UserId = Brand<number, "UserId">;
export type OrderId = Brand<number, "OrderId">;

export function getUser(id: UserId): string {
  return `User fetched with ID: ${id}`;
}

// Допоміжні конструктори для створення брендованих типів без використання 'as' (через функцію-предикат)
function createUserId(id: number): UserId {
  return id as UserId; // У типізації брендингу допускається каст у функції-фабриці
}

function createOrderId(id: number): OrderId {
  return id as OrderId;
}

const validUserId = createUserId(10);
const validOrderId = createOrderId(42);

getUser(validUserId); // Компілюється ОК!

/*
getUser(validOrderId);
// Помилка компіляції:
// Argument of type 'OrderId' is not assignable to parameter of type 'UserId'.
// Type 'OrderId' is not assignable to type '{ readonly [__brand]: "UserId"; }'.
// Types of property '[__brand]' are incompatible.
// Type '"OrderId"' is not assignable to type '"UserId"'.
*/

// ==========================================
// Завдання 8 — Функція обробки VendorSDK.Context

export function processVendorContext(ctx: VendorSDK.Context): void {
  console.log(`Request ID: ${ctx.requestId}`);
  if (ctx.user) {
    console.log(`User Email: ${ctx.user.email}`);
  }
}