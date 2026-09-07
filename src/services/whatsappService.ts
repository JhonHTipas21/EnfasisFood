// ================================================================
// ÉNFASIS FOOD — WhatsApp Service
// Principio SOLID: Single Responsibility — solo generación de links
// ================================================================
import { CONTACT, formatPrice } from '../constants/business';
import type { OrderFormData, OrderItem } from '../types';

const buildOrderMessage = (
  formData: OrderFormData,
  items: OrderItem[],
  total: number
): string => {
  const header = `🍟 *PEDIDO ÉNFASIS FOOD*`;
  const separator = `━━━━━━━━━━━━━━━━━━━━`;

  const itemLines = items
    .map((item) => `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
    .join('\n');

  const deliveryCost = CONTACT.deliveryCost;
  const totalWithDelivery = total + deliveryCost;

  const lines = [
    header,
    separator,
    `👤 *Cliente:* ${formData.name}`,
    `📍 *Dirección:* ${formData.address}`,
    `📱 *Teléfono:* ${formData.phone}`,
    separator,
    `🛒 *Pedido:*`,
    itemLines,
    separator,
    `💰 *Subtotal:* ${formatPrice(total)}`,
    `🚚 *Domicilio:* ${formatPrice(deliveryCost)}`,
    `✅ *TOTAL:* ${formatPrice(totalWithDelivery)}`,
    separator,
    `💳 *Pago:* ${formData.paymentMethod === 'nequi' ? 'Nequi' : 'Contra entrega / WhatsApp'}`,
    formData.notes ? `📝 *Notas:* ${formData.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return lines;
};

export const buildWhatsAppUrl = (
  formData: OrderFormData,
  items: OrderItem[],
  total: number
): string => {
  const message = buildOrderMessage(formData, items, total);
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${CONTACT.whatsapp}&text=${encodedMessage}`;
};

export const openWhatsApp = (
  formData: OrderFormData,
  items: OrderItem[],
  total: number
): void => {
  const url = buildWhatsAppUrl(formData, items, total);
  window.open(url, '_blank', 'noopener,noreferrer');
};
