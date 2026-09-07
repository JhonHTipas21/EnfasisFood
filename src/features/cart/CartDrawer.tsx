// ================================================================
// ÉNFASIS FOOD — Cart Drawer Feature
// ================================================================
import { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice, CONTACT } from '../../constants/business';
import { Button } from '../../components/ui/Button';
import { OrderModal } from '../order/OrderModal';
import './CartDrawer.css';

export const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
  } = useCartStore();

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  if (!isOpen) return null;

  const total = totalPrice();
  const totalWithDelivery = total + CONTACT.deliveryCost;

  const handleGoToMenu = () => {
    closeCart();
    setTimeout(() => {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />

      <aside
        className="cart-drawer"
        role="complementary"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <ShoppingCart size={20} />
            Tu Pedido
          </h2>
          <button
            id="cart-close-btn"
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="cart-drawer__empty-icon" aria-hidden="true">🍟</span>
            <p>Tu carrito está vacío</p>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Agrega algo delicioso del menú
            </p>
            <Button id="cart-go-menu-btn" variant="secondary" size="sm" onClick={handleGoToMenu}>
              Ver Menú 🍟
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="cart-drawer__items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item__img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="cart-item__img-placeholder" aria-hidden="true">
                      🥤
                    </div>
                  )}

                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="cart-item__controls">
                    <button
                      id={`cart-dec-${item.id}`}
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Reducir cantidad de ${item.name}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="cart-item__qty">{item.quantity}</span>
                    <button
                      id={`cart-inc-${item.id}`}
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      id={`cart-remove-${item.id}`}
                      className="cart-item__qty-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.name}`}
                      style={{ color: 'var(--color-error)' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cart-drawer__footer">
              <div className="cart-drawer__summary">
                <div className="cart-drawer__summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="cart-drawer__summary-row">
                  <span>Domicilio</span>
                  <span>{formatPrice(CONTACT.deliveryCost)}</span>
                </div>
                <div className="cart-drawer__total-row">
                  <span className="cart-drawer__total-label">Total</span>
                  <span className="cart-drawer__total-price">
                    {formatPrice(totalWithDelivery)}
                  </span>
                </div>
              </div>

              <Button
                id="cart-order-btn"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setOrderModalOpen(true)}
              >
                Hacer Pedido 🛵
              </Button>

              <Button
                id="cart-clear-btn"
                variant="ghost"
                size="sm"
                fullWidth
                onClick={clearCart}
              >
                Vaciar carrito
              </Button>
            </div>
          </>
        )}
      </aside>

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </>
  );
};
