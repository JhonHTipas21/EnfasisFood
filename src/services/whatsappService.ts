// ================================================================
// ÉNFASIS FOOD — WhatsApp Service (Ticket Creativo & Redirección Garantizada)
// Principio SOLID: Single Responsibility
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
    .map((item) => `• *${item.quantity}x* ${item.name} -> ${formatPrice(item.price * item.quantity)}`)
    .join('\n');

  const deliveryBadge = isDelivery ? '🛵 Domicilio (+$3.000)' : '🏬 Recoger en local ($0)';
  const paymentBadge = formData.paymentMethod === 'nequi' ? '💜 Nequi' : '💵 Efectivo contra entrega';

  return [
    `*📋 ÉNFASIS FOOD — TICKET DE PEDIDO 📋*`,
    `----------------------------------------`,
    `📅 *Fecha:* ${dateStr} - ${timeStr}`,
    ``,
    `👤 *DATOS DEL CLIENTE:*`,
    `• *Nombre:* ${formData.name}`,
    `• *Teléfono:* ${formData.phone}`,
    `• *Entrega:* ${deliveryBadge}`,
    isDelivery ? `• *Dirección:* ${formData.address}` : `• *Punto:* Recoger en local`,
    ``,
    `----------------------------------------`,
    `🛒 *DETALLE DEL PEDIDO:*`,
    itemLines,
    `----------------------------------------`,
    `💰 *Subtotal:* ${formatPrice(subtotal)}`,
    `🛵 *Domicilio:* ${isDelivery ? formatPrice(deliveryCost) : 'GRATIS ($0)'}`,
    `🏷️ *TOTAL A PAGAR:* *${formatPrice(total)}*`,
    `----------------------------------------`,
    `💳 *Método de pago:* ${paymentBadge}`,
    formData.notes ? `📝 *Instrucciones:* ${formData.notes}` : '',
    `----------------------------------------`,
    `✨ _¡Muchas gracias por preferir Énfasis Food!_`,
    `_Sabor que marca la diferencia._`,
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

  // Redirección infalible a WhatsApp sin ser bloqueada por navegadores móviles o popups:
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {
    // Si el navegador bloquea la apertura de enlace
  }

  // Redirección directa de respaldo garantizada en la ventana activa
  setTimeout(() => {
    window.location.href = url;
  }, 250);
};
