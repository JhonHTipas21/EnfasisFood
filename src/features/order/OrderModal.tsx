// ================================================================
// ÉNFASIS FOOD — Order Modal Feature (Pedido + Pago)
// ================================================================
import { useState } from 'react';
import { ShoppingBag, MessageCircle, CreditCard } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../stores/cartStore';
import { openWhatsApp } from '../../services/whatsappService';
import { formatPrice, CONTACT } from '../../constants/business';
import type { OrderFormData, PaymentMethod } from '../../types';
import './OrderModal.css';

const INITIAL_FORM: OrderFormData = {
  name: '',
  address: '',
  phone: '',
  notes: '',
  paymentMethod: 'whatsapp',
};

/* ── Nequi instructions box ── */
const NequiBox = () => (
  <div className="nequi-box">
    <p className="nequi-box__title">
      <CreditCard size={18} />
      Paga por Nequi
    </p>
    <p className="nequi-box__number">📱 {CONTACT.nequiNumber}</p>
    <div className="nequi-box__steps">
      {[
        'Abre tu app de Nequi',
        `Envía el valor total al número ${CONTACT.nequiNumber}`,
        'Toma una captura del pago',
        'Haz clic en "Confirmar por WhatsApp" y adjunta el comprobante',
      ].map((step, i) => (
        <div key={i} className="nequi-step">
          <span className="nequi-step__num">{i + 1}</span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Main Order Modal ── */
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal = ({ isOpen, onClose }: OrderModalProps) => {
  const [form, setForm] = useState<OrderFormData>(INITIAL_FORM);
  const { items, totalPrice, clearCart, closeCart } = useCartStore();

  const total = totalPrice();
  const totalWithDelivery = total + CONTACT.deliveryCost;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setForm((prev) => ({ ...prev, paymentMethod: method }));
  };

  const isValid = form.name.trim() && form.address.trim() && form.phone.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const orderItems = items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    openWhatsApp(form, orderItems, total);
    clearCart();
    closeCart();
    onClose();
    setForm(INITIAL_FORM);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Realizar Pedido 🍟">
      <form
        id="order-form"
        className="order-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Order Summary */}
        <div className="order-summary">
          <div className="order-summary__header">
            <ShoppingBag size={16} />
            Resumen de tu pedido
          </div>
          <div className="order-summary__items">
            {items.map((item) => (
              <div key={item.id} className="order-summary__item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="order-summary__item">
              <span>Domicilio</span>
              <span>{formatPrice(CONTACT.deliveryCost)}</span>
            </div>
          </div>
          <div className="order-summary__total">
            <span className="order-summary__total-label">Total</span>
            <span className="order-summary__total-price">
              {formatPrice(totalWithDelivery)}
            </span>
          </div>
        </div>

        {/* Customer Data */}
        <div className="form-field">
          <label htmlFor="order-name" className="form-label">
            Nombre <span>*</span>
          </label>
          <input
            id="order-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Tu nombre completo"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="order-address" className="form-label">
            Dirección de entrega <span>*</span>
          </label>
          <input
            id="order-address"
            name="address"
            type="text"
            className="form-input"
            placeholder="Barrio, Calle, Casa/Apto..."
            value={form.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
          />
        </div>

        <div className="form-field">
          <label htmlFor="order-phone" className="form-label">
            Teléfono <span>*</span>
          </label>
          <input
            id="order-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="3XX XXX XXXX"
            value={form.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
        </div>

        <div className="form-field">
          <label htmlFor="order-notes" className="form-label">
            Notas adicionales
          </label>
          <textarea
            id="order-notes"
            name="notes"
            className="form-textarea"
            placeholder="Preferencias, instrucciones especiales..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div className="form-field">
          <span className="form-label">Método de pago <span>*</span></span>
          <div className="payment-selector">
            <button
              id="payment-whatsapp-btn"
              type="button"
              className={`payment-option ${form.paymentMethod === 'whatsapp' ? 'payment-option--selected' : ''}`}
              onClick={() => handlePaymentSelect('whatsapp')}
              aria-pressed={form.paymentMethod === 'whatsapp'}
            >
              <span className="payment-option__icon">
                <MessageCircle size={28} color="#25d366" />
              </span>
              <span className="payment-option__name">WhatsApp</span>
              <span className="payment-option__desc">Confirma y paga contra entrega</span>
            </button>

            <button
              id="payment-nequi-btn"
              type="button"
              className={`payment-option ${form.paymentMethod === 'nequi' ? 'payment-option--selected' : ''}`}
              onClick={() => handlePaymentSelect('nequi')}
              aria-pressed={form.paymentMethod === 'nequi'}
            >
              <span className="payment-option__icon">💜</span>
              <span className="payment-option__name">Nequi</span>
              <span className="payment-option__desc">Transfiere y adjunta el comprobante</span>
            </button>
          </div>
        </div>

        {/* Nequi instructions */}
        {form.paymentMethod === 'nequi' && <NequiBox />}

        {/* Submit */}
        <Button
          id="order-submit-btn"
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isValid}
        >
          {form.paymentMethod === 'nequi'
            ? '✅ Confirmar por WhatsApp'
            : '📲 Enviar pedido por WhatsApp'}
        </Button>
      </form>
    </Modal>
  );
};
