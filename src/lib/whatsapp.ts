export const WHATSAPP_NUMBER = '917979894243';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const QUOTE_REQUEST_URL = buildWhatsAppUrl(
  'Hi Ankur Logistics, I would like to request a freight quote. Please share a guaranteed corporate rate for my shipment.',
);

export const DISPATCH_CHAT_URL = buildWhatsAppUrl(
  'Hi Ankur Logistics dispatch desk, I need assistance with a shipment.',
);
