// ================================================================
// ÉNFASIS FOOD — Social Section + Footer
// ================================================================
import { MapPin, Phone, Bike } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { SectionHeader } from '../ui/SectionHeader';
import { CONTACT, SOCIAL_URLS } from '../../constants/business';
import logoImg from '../../assets/images/logo.jpeg';
import './Social.css';

const SOCIAL_CARDS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: CONTACT.whatsappDisplay,
    icon: '💬',
    href: SOCIAL_URLS.whatsapp,
    cta: 'Pide ahora →',
    className: 'social-card--whatsapp',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: `@${CONTACT.instagram}`,
    icon: '📸',
    href: SOCIAL_URLS.instagram,
    cta: 'Síguenos →',
    className: 'social-card--instagram',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: `@${CONTACT.tiktok}`,
    icon: '🎵',
    href: SOCIAL_URLS.tiktok,
    cta: 'Mira nuestros videos →',
    className: 'social-card--tiktok',
  },
];

const SocialCard = ({
  card,
  index,
}: {
  card: (typeof SOCIAL_CARDS)[number];
  index: number;
}) => {
  const { ref, isVisible } = useIntersection({ threshold: 0.15 });

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      id={`social-${card.id}-link`}
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card ${card.className} ${isVisible ? 'social-card--visible' : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
      aria-label={`Visitar ${card.name} de Énfasis Food`}
    >
      <div className="social-card__icon" aria-hidden="true">
        {card.icon}
      </div>
      <p className="social-card__name">{card.name}</p>
      <p className="social-card__handle">{card.handle}</p>
      <p className="social-card__cta">{card.cta}</p>
    </a>
  );
};

/* ── Social Section ── */
export const SocialSection = () => (
  <section id="contacto" className="social-section section" aria-label="Redes sociales y contacto">
    <div className="container">
      <SectionHeader
        eyebrow="Encuéntranos"
        title="Síguenos en Redes"
        subtitle="Estamos en todas partes. Pide por WhatsApp, síguenos en Instagram y mira nuestros videos en TikTok."
        centered
      />

      <div className="social-grid" role="list" aria-label="Redes sociales">
        {SOCIAL_CARDS.map((card, i) => (
          <SocialCard key={card.id} card={card} index={i} />
        ))}
      </div>

      {/* Contact bar */}
      <div className="contact-bar">
        <div className="contact-bar__item">
          <Phone size={20} className="contact-bar__icon" aria-hidden="true" />
          <div>
            <p className="contact-bar__label">{CONTACT.whatsappDisplay}</p>
            <p style={{ fontSize: 'var(--text-xs)' }}>WhatsApp & Llamadas</p>
          </div>
        </div>
        <div className="contact-bar__item">
          <Bike size={20} className="contact-bar__icon" aria-hidden="true" />
          <div>
            <p className="contact-bar__label">Domicilio $3.000</p>
            <p style={{ fontSize: 'var(--text-xs)' }}>Zona de cobertura local</p>
          </div>
        </div>
        <div className="contact-bar__item">
          <MapPin size={20} className="contact-bar__icon" aria-hidden="true" />
          <div>
            <p className="contact-bar__label">Pedidos en línea</p>
            <p style={{ fontSize: 'var(--text-xs)' }}>Lun–Dom · Todo el día</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Footer ── */
export const Footer = () => (
  <footer className="footer" id="nosotros" role="contentinfo">
    <div className="container">
      <div className="footer__inner">
        <div className="footer__logo">
          <img src={logoImg} alt="Logo Énfasis Food" className="footer__logo-img" width={40} height={40} />
          <span className="footer__brand">Énfasis Food</span>
        </div>

        <p className="footer__tagline">
          Salchipapas premium a domicilio. Sabor auténtico, ingredientes frescos y el cariño de siempre en cada porción.
        </p>

        <nav className="footer__links" aria-label="Links del footer">
          <a href="#inicio"   className="footer__link">Inicio</a>
          <a href="#menu"     className="footer__link">Menú</a>
          <a href="#galeria"  className="footer__link">Galería</a>
          <a href="#contacto" className="footer__link">Contacto</a>
          <a href={SOCIAL_URLS.whatsapp} target="_blank" rel="noopener noreferrer" className="footer__link">
            WhatsApp
          </a>
        </nav>

        <div className="footer__divider" aria-hidden="true" />

        <p className="footer__copy">
          © {new Date().getFullYear()} <span>Énfasis Food</span> · Todos los derechos reservados.
          Hecho con ❤️ y mucho sabor.
        </p>
      </div>
    </div>
  </footer>
);
