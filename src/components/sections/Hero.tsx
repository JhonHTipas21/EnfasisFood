// ================================================================
// ÉNFASIS FOOD — Hero Section (Video Banner)
// ================================================================
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import videoSrc from '../../assets/video/README.mp4';
import './Hero.css';

export const Hero = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero" aria-label="Sección de bienvenida">
      {/* Video Banner Oficial */}
      <video
        className="hero__video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Overlays elegantes para contraste y calidez dorada */}
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__shimmer" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        <p className="hero__eyebrow">🍟 Sabor que marca la diferencia</p>

        <h1 className="hero__title">
          La Salchipapa
          <span>Perfecta</span>
        </h1>

        <p className="hero__subtitle">
          Ingredientes frescos, sazón única y el cariño de siempre.
          Pídela a domicilio y hazla llegar caliente hasta tu puerta.
        </p>

        <div className="hero__cta-group">
          <Button
            id="hero-ver-menu-btn"
            variant="primary"
            size="lg"
            onClick={handleScrollToMenu}
          >
            Ver el Menú 🍟
          </Button>
        </div>
      </div>

      {/* Scroll indicator no invasivo — se desvanece al deslizar */}
      <div
        className={`hero__scroll-indicator ${hasScrolled ? 'hero__scroll-indicator--hidden' : ''}`}
        aria-hidden="true"
        onClick={handleScrollToMenu}
      >
        <div className="hero__scroll-dot" />
        <span>Desliza para ver el menú</span>
      </div>
    </section>
  );
};
