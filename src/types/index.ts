// ================================================================
// ÉNFASIS FOOD — TypeScript Types & Interfaces
// Principio SOLID: Interface Segregation
// ================================================================

// --- Cart Types ---
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// --- Order Types ---
export type PaymentMethod = 'whatsapp' | 'nequi';
export type DeliveryType = 'delivery' | 'pickup';

export interface OrderFormData {
  name: string;
  phone: string;
  deliveryType: DeliveryType;
  address: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

// --- UI Types ---
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  children: React.ReactNode;
  className?: string;
}

// --- Modal Types ---
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// --- Section Types ---
export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}
