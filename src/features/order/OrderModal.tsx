// ================================================================
// ÉNFASIS FOOD — Order Modal Feature (Pedido + Entrega + Pago)
// ================================================================
import { useState } from 'react';
import { ShoppingBag, Bike, Store, Copy, Check } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../stores/cartStore';
import { openWhatsApp } from '../../services/whatsappService';
import { formatPrice, CONTACT } from '../../constants/business';
import type { OrderFormData, PaymentMethod, DeliveryType } from '../../types';
import whatsappLogo from '../../assets/images/icons/whatsapp.png';
import nequiIcon from '../../assets/images/icons/nequi_icon.png';
import './OrderModal.css';

const INITIAL_FORM: OrderFormData = {
  name: '',
  phone: '',
  deliveryType: 'delivery',
  address: '',
  notes: '',
  paymentMethod: 'whatsapp',
};

/* ── Nequi instructions box con botón de copia ── */
const NequiBox = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(CONTACT.nequiNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="nequi-box">
      <div className="nequi-box__title">
        <img src={nequiIcon} alt="Logo Nequi" className="nequi-box__logo" />
        <span>Instrucciones de Pago con Nequi</span>
      </div>

      <div className="nequi-box__number-row">
        <div className="nequi-box__number-wrap">
          <span className="nequi-box__number-label">Número Nequi:</span>
          <span className="nequi-box__number">{CONTACT.nequiNumber}</span>
        </div>
        <button
          id="copy-nequi-btn"
          type="button"
          className={`nequi-copy-btn ${copied ? 'nequi-copy-btn--copied' : ''}`}
          onClick={handleCopyNumber}
          title="Copiar número Nequi"
          aria-label="Copiar número Nequi al portapapeles"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <div className="nequi-box__steps">
        {[
          'Abre tu app de Nequi',
          `Envía el total del pedido al número ${CONTACT.nequiNumber}`,
          'Toma una captura del comprobante',
          'Haz clic en "Confirmar por WhatsApp" y adjunta tu comprobante',
        ].map((step, i) => (
          <div key={i} className="nequi-step">
            <span className="nequi-step__num">{i + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Order Modal ── */
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal = ({ isOpen, onClose }: OrderModalProps) => {
  const [form, setForm] = useState<OrderFormData>(INITIAL_FORM);
  const { items, totalPrice, clearCart, closeCart } = useCartStore();

  const subtotal = totalPrice();
  const isDelivery = form.deliveryType === 'delivery';
  const deliveryFee = isDelivery ? CONTACT.deliveryCost : 0;
  const totalWithDelivery = subtotal + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliverySelect = (type: DeliveryType) => {
    setForm((prev) => ({ ...prev, deliveryType: type }));
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setForm((prev) => ({ ...prev, paymentMethod: method }));
  };

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    (!isDelivery || form.address.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const orderItems = items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    openWhatsApp(form, orderItems, subtotal);

    // Dar margen para que el protocolo o ventana de WhatsApp se abra antes de limpiar el estado
    setTimeout(() => {
      clearCart();
      closeCart();
      onClose();
      setForm(INITIAL_FORM);
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar Pedido 🍟">
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
            <span>Resumen del Pedido</span>
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
            <div className="order-summary__item order-summary__item--delivery">
              <span>
                {isDelivery ? '🛵 Servicio de Domicilio' : '🏬 Recoger en punto'}
              </span>
              <span>{isDelivery ? formatPrice(deliveryFee) : 'GRATIS ($0)'}</span>
            </div>
          </div>
          <div className="order-summary__total">
            <span className="order-summary__total-label">Total a Pagar</span>
            <span className="order-summary__total-price">
              {formatPrice(totalWithDelivery)}
            </span>
          </div>
        </div>

        {/* Modalidad de entrega */}
        <div className="form-field">
          <span className="form-label">
            ¿Cómo deseas recibir tu pedido? <span>*</span>
          </span>
          <div className="delivery-selector">
            <button
              id="delivery-opt-btn"
              type="button"
              className={`delivery-option ${isDelivery ? 'delivery-option--selected' : ''}`}
              onClick={() => handleDeliverySelect('delivery')}
              aria-pressed={isDelivery}
            >
              <Bike size={20} />
              <div className="delivery-option__text">
                <span className="delivery-option__title">A Domicilio</span>
                <span className="delivery-option__price">+ $3.000 COP</span>
              </div>
            </button>

            <button
              id="pickup-opt-btn"
              type="button"
              className={`delivery-option ${!isDelivery ? 'delivery-option--selected' : ''}`}
              onClick={() => handleDeliverySelect('pickup')}
              aria-pressed={!isDelivery}
            >
              <Store size={20} />
              <div className="delivery-option__text">
                <span className="delivery-option__title">Recoger en Local</span>
                <span className="delivery-option__price">Sin costo ($0)</span>
              </div>
            </button>
          </div>
        </div>

        {/* Customer Data */}
        <div className="form-field">
          <label htmlFor="order-name" className="form-label">
            Tu Nombre Completo <span>*</span>
          </label>
          <input
            id="order-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Ej: Carlos Gómez"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="order-phone" className="form-label">
            Teléfono o WhatsApp <span>*</span>
          </label>
          <input
            id="order-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="Ej: 320 506 9834"
            value={form.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
        </div>

        {isDelivery ? (
          <div className="form-field">
            <label htmlFor="order-address" className="form-label">
              Dirección de Entrega <span>*</span>
            </label>
            <input
              id="order-address"
              name="address"
              type="text"
              className="form-input"
              placeholder="Barrio, Calle, Carrera, Casa o Apto..."
              value={form.address}
              onChange={handleChange}
              required
              autoComplete="street-address"
            />
          </div>
        ) : (
          <div className="pickup-notice">
            <Store size={18} />
            <span>Recogerás tu pedido en nuestro punto físico Énfasis Food.</span>
          </div>
        )}

        <div className="form-field">
          <label htmlFor="order-notes" className="form-label">
            Instrucciones o preferencias (Opcional)
          </label>
          <textarea
            id="order-notes"
            name="notes"
            className="form-textarea"
            placeholder="Ej: Sin tártara, salsa aparte, timbre 201..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div className="form-field">
          <span className="form-label">
            Método de Pago <span>*</span>
          </span>
          <div className="payment-selector">
            <button
              id="payment-whatsapp-btn"
              type="button"
              className={`payment-option ${form.paymentMethod === 'whatsapp' ? 'payment-option--selected' : ''}`}
              onClick={() => handlePaymentSelect('whatsapp')}
              aria-pressed={form.paymentMethod === 'whatsapp'}
            >
              <div className="payment-option__icon-wrap">
                <img src={whatsappLogo} alt="Logo WhatsApp" className="payment-option__logo" />
              </div>
              <span className="payment-option__name">Efectivo / WhatsApp</span>
              <span className="payment-option__desc">Paga contra entrega al recibir</span>
            </button>

            <button
              id="payment-nequi-btn"
              type="button"
              className={`payment-option ${form.paymentMethod === 'nequi' ? 'payment-option--selected' : ''}`}
              onClick={() => handlePaymentSelect('nequi')}
              aria-pressed={form.paymentMethod === 'nequi'}
            >
              <div className="payment-option__icon-wrap">
                <img src={nequiIcon} alt="Logo Nequi" className="payment-option__logo" />
              </div>
              <span className="payment-option__name">Nequi</span>
              <span className="payment-option__desc">Transferencia inmediata</span>
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
          className="order-submit-btn"
        >
          {form.paymentMethod === 'nequi'
            ? 'Confirmar por WhatsApp 📲'
            : 'Pedir por WhatsApp 📲'}
        </Button>
      </form>
    </Modal>
  );
};
