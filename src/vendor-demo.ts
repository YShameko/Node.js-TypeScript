// ==========================================
// Завдання 8 - Злиття оголошень
// читає обидва поля - і requestId, і user.

export function processVendorContext(ctx: VendorSDK.Context): void {
  console.log(`Request ID: ${ctx.requestId}`);
  if (ctx.user) {
    console.log(`User Email: ${ctx.user.email}`);
  }
}