// ==========================================
// Завдання 8 - Злиття оголошень
// Допоміжні типи та інтерфейси для злиття оголошень

import { User } from "./domain";

declare global {
  namespace VendorSDK {
    interface Context {
      user?: User;
    }
  }
}
