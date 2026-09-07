// ================================================================
// ÉNFASIS FOOD — WhatsApp Service (Ticket Creativo)
// Principio SOLID: Single Responsibility — Formateo y envío de tickets
// ================================================================
import { CONTACT, formatPrice } from '../constants/business';
import type { OrderFormData, OrderItem } from '../types';

export const buildOrderMessage = (
  formData: OrderFormData,
  items: OrderItem[],
  subtotal: number
): string => {
  const isDelivery = formData.deliveryType === 'delivery';
  const deliveryCost = isDelivery ? CONTACT.deliveryCost : 0;
  const total = subtotal + deliveryCost;

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemLines = items
    .map((item) => `│  ▫️ *${item.quantity}x* ${item.name}\n│     └─ ${formatPrice(item.price * item.quantity)}`)
    .join('\n');

  const deliveryBadge = isDelivery ? '🛵 Domicilio a tu puerta' : '🏬 Recoger en punto / Local';
  const paymentBadge = formData.paymentMethod === 'nequi' ? '💜 Nequi (Transferencia)' : '💵 Efectivo (Contra entrega)';

  return [
    `╔═══════════════════════════╗`,
    `║   🍟 *ÉNFASIS FOOD* 🍟    ║`,
    `║    _Ticket Oficial de Pedido_   ║`,
    `╚═══════════════════════════╝`,
    `📅 *Fecha:* ${dateStr} - ${timeStr}`,
    ``,
    `👤 *DATOS DEL CLIENTE:*`,
    `├ 🏷️ *Nombre:* ${formData.name}`,
    `├ 📱 *Teléfono:* ${formData.phone}`,
    `├ 🛵 *Modalidad:* ${deliveryBadge}`,
    isDelivery ? `└ 📍 *Dirección:* ${formData.address}` : `└ 📍 *Entrega:* Recoge en local`,
    ``,
    `📋 *DETALLE DEL PEDIDO:*`,
    `┌───────────────────────────┐`,
    itemLines,
    `└───────────────────────────┘`,
    ``,
    `💳 *LIQUIDACIÓN:*`,
    `├ 💰 *Subtotal:* ${formatPrice(subtotal)}`,
    `├ 🛵 *Domicilio:* ${isDelivery ? formatPrice(deliveryCost) : 'GRATIS ($0)'}`,
    `└ 🏷️ *TOTAL A PAGAR:* *${formatPrice(total)}*`,
    ``,
    `💵 *Método de pago:* ${paymentBadge}`,
    formData.notes ? `📝 *Instrucciones:* ${formData.notes}` : '',
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `✨ _¡Muchas gracias por elegir Énfasis Food!_`,
    `🍟 _Sabor que marca la diferencia._`,
  ]
    .filter(Boolean)
    .join('\n');
};

export const buildWhatsAppUrl = (
  formData: OrderFormData,
  items: OrderItem[],
  subtotal: number
): string => {
  const message = buildOrderMessage(formData, items, subtotal);
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${CONTACT.whatsapp}&text=${encodedMessage}`;
};

export const openWhatsApp = (
  formData: OrderFormData,
  items: OrderItem[],
  subtotal: number
): void => {
  const url = buildWhatsAppUrl(formData, items, subtotal);
  window.open(url, '_blank', 'noopener,noreferrer');
};
