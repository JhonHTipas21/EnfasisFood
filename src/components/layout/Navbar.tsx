// ================================================================
// ÉNFASIS FOOD — Navbar Component
// ================================================================
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';
import { useCartStore } from '../../stores/cartStore';
import logoImg from '../../assets/images/logo.jpeg';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Inicio',     href: '#inicio' },
  { label: 'Menú',       href: '#menu' },
  { label: 'Galería',    href: '#galeria' },
  { label: 'Nosotros',   href: '#nosotros' },
  { label: 'Contáctanos',href: '#contacto' },
];

export const Navbar = () => {
  const scrolled = useScroll(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, totalItems } = useCartStore();
  const cartCount = totalItems();

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="navbar__inner">
          {/* Logo */}
          <a href="#inicio" className="navbar__logo" aria-label="Énfasis Food - Inicio">
            <img
              src={logoImg}
              alt="Logo Énfasis Food"
              className="navbar__logo-img"
              width={44}
              height={44}
            />
            <div className="navbar__brand">
              <span className="navbar__brand-name">Énfasis</span>
              <span className="navbar__brand-sub">Food</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link" role="listitem">
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              id="navbar-cart-btn"
              className="navbar__cart-btn"
              onClick={openCart}
              aria-label={`Carrito, ${cartCount} ${cartCount === 1 ? 'ítem' : 'ítems'}`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="navbar__cart-badge" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="navbar-hamburger-btn"
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
        role="menu"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={handleLinkClick}
            role="menuitem"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};
