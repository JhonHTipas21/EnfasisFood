// ================================================================
// ÉNFASIS FOOD — Business Constants
// Principio SOLID: Open/Closed — agregar productos sin modificar
// ================================================================

import producto1 from '../assets/images/producto-1.jpeg';
import producto2 from '../assets/images/producto-2.jpeg';
import producto3 from '../assets/images/producto-3.jpeg';
import producto4 from '../assets/images/producto-4.jpeg';
import producto5 from '../assets/images/producto-5.jpeg';
import producto6 from '../assets/images/producto-6.jpeg';

// --- Contacto ---
export const CONTACT = {
  whatsapp: '573205069834',
  whatsappDisplay: '320 506 9834',
  instagram: 'enfasis_food',
  tiktok: 'enfasis_food_',
  nequiNumber: '3205069834',
  deliveryCost: 3000,
} as const;

// --- URLs Sociales ---
export const SOCIAL_URLS = {
  whatsapp:  `https://api.whatsapp.com/send/?phone=${CONTACT.whatsapp}`,
  instagram: 'https://www.instagram.com/enfasis_food',
  tiktok:    'https://www.tiktok.com/@enfasis_food_',
} as const;

// --- Menú de Salchipapas ---
export const MENU_ITEMS = [
  {
    id: 'sencilla',
    name: 'Salchipapa Sencilla',
    shortName: 'Sencilla',
    description: 'Papas fritas crujientes con salchichas doradas, queso fundido y salsas de la casa.',
    price: 15000,
    category: 'salchipapas' as const,
    image: producto6,
    tag: 'Clásica',
    popular: false,
  },
  {
    id: 'sencilla-doble',
    name: 'Salchipapa Sencilla Doble',
    shortName: 'Sencilla Doble',
    description: 'Doble porción de nuestra salchipapa sencilla. Perfecta para compartir.',
    price: 23000,
    category: 'salchipapas' as const,
    image: producto5,
    tag: 'Para 2',
    popular: false,
  },
  {
    id: 'especial',
    name: 'Salchipapa Especial',
    shortName: 'Especial',
    description: 'Papas + salchichas con pollo desmenuzado, mazorca tierna y salsas especiales.',
    price: 20000,
    category: 'salchipapas' as const,
    image: producto1,
    tag: 'Favorita',
    popular: true,
  },
  {
    id: 'especial-doble',
    name: 'Salchipapa Especial Doble',
    shortName: 'Especial Doble',
    description: 'Doble porción de la Especial. Pollo, mazorca, salchichas y queso gratinado.',
    price: 32000,
    category: 'salchipapas' as const,
    image: producto2,
    tag: 'Para 2',
    popular: false,
  },
  {
    id: 'chiquito',
    name: 'El Chiquito III',
    shortName: 'El Chiquito III',
    description: 'Tres capas de sabor: papas, salchichas BBQ, pollo y mazorca. Nuestro especial familiar.',
    price: 38000,
    category: 'salchipapas' as const,
    image: producto3,
    tag: 'Familiar',
    popular: true,
  },
  {
    id: 'cosota',
    name: 'La Cosota',
    shortName: 'La Cosota',
    description: 'El rey de las salchipapas. Porción XXL con todo: papas, salchichas, pollo, mazorca y queso gratinado.',
    price: 69000,
    category: 'salchipapas' as const,
    image: producto4,
    tag: '⭐ Premium XXL',
    popular: true,
  },
] as const;

// --- Bebidas ---
export const DRINKS = [
  {
    id: 'coca-personal',
    name: 'Coca-Cola Personal',
    shortName: 'Coca-Cola Personal',
    description: 'Bebida refrescante 250ml.',
    price: 4000,
    category: 'bebidas' as const,
    image: null,
    tag: 'Bebida',
    popular: false,
  },
  {
    id: 'coca-litro',
    name: 'Coca-Cola Litro y Medio',
    shortName: 'Coca-Cola 1.5L',
    description: 'Bebida familiar 1.5 litros.',
    price: 8000,
    category: 'bebidas' as const,
    image: null,
    tag: 'Familiar',
    popular: false,
  },
] as const;

// Tipos derivados de las constantes
export type MenuItem = typeof MENU_ITEMS[number];
export type DrinkItem = typeof DRINKS[number];
export type AnyItem = MenuItem | DrinkItem;

// Formateador de precios colombianos
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
