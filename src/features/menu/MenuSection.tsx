// ================================================================
// ÉNFASIS FOOD — Menu Section Feature
// ================================================================
import { Plus } from 'lucide-react';
import { MENU_ITEMS, DRINKS, formatPrice } from '../../constants/business';
import { useCartStore } from '../../stores/cartStore';
import { useIntersection } from '../../hooks/useIntersection';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';
import './MenuSection.css';

/* ── Card for each salchipapa product ── */
const MenuCard = ({ item }: { item: typeof MENU_ITEMS[number] }) => {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    openCart();
  };

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`menu-card ${isVisible ? 'menu-card--visible' : ''}`}
      aria-label={`${item.name} — ${formatPrice(item.price)}`}
    >
      <div className="menu-card__image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card__image"
          loading="lazy"
          width={300}
          height={220}
        />
        <span
          className={`menu-card__tag ${item.popular ? 'menu-card__tag--popular' : ''}`}
        >
          {item.tag}
        </span>
      </div>

      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__description">{item.description}</p>
      </div>

      <div className="menu-card__footer">
        <span className="menu-card__price">{formatPrice(item.price)}</span>
        <Button
          id={`add-to-cart-${item.id}`}
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
        >
          <Plus size={14} />
          Agregar
        </Button>
      </div>
    </article>
  );
};

/* ── Drink card ── */
const DrinkCard = ({ item }: { item: typeof DRINKS[number] }) => {
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: null });
    openCart();
  };

  return (
    <div className="menu-drink-card">
      <span className="menu-drink-card__icon" aria-hidden="true">🥤</span>
      <div>
        <p className="menu-drink-card__name">{item.name}</p>
        <p className="menu-drink-card__price">{formatPrice(item.price)}</p>
      </div>
      <div className="menu-drink-card__actions">
        <Button
          id={`add-to-cart-${item.id}`}
          variant="ghost"
          size="sm"
          onClick={handleAdd}
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
};

/* ── Main Section ── */
export const MenuSection = () => (
  <section id="menu" className="menu-section section" aria-label="Nuestro Menú">
    <div className="container">
      <SectionHeader
        eyebrow="Nuestro Menú"
        title="Sabor en Cada Capa"
        subtitle="Salchipapas preparadas con ingredientes frescos, pollo desmenuzado, mazorca tierna y salsas de la casa. Elige tu favorita."
        centered
      />

      <div className="menu-grid" role="list" aria-label="Productos disponibles">
        {MENU_ITEMS.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {/* Drinks */}
      <h3
        style={{
          textAlign: 'center',
          marginTop: 'var(--space-16)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-silver)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Bebidas
      </h3>
      <div className="menu-drinks-grid">
        {DRINKS.map((drink) => (
          <DrinkCard key={drink.id} item={drink} />
        ))}
      </div>
    </div>
  </section>
);
