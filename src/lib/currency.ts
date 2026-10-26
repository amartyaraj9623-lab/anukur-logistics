export type Currency = 'INR' | 'USD';

export const EXCHANGE_RATE = 83; // 1 USD ≈ 83 INR

export function formatPrice(amountINR: number, currency: Currency): string {
  if (currency === 'INR') {
    return '₹' + Math.round(amountINR).toLocaleString('en-IN');
  }
  return '$' + Math.round(amountINR / EXCHANGE_RATE).toLocaleString('en-US');
}
