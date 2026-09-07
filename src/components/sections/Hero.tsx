// ================================================================
// ÉNFASIS FOOD — Hero Section (Video Banner)
// ================================================================
import { Button } from '../ui/Button';
import videoSrc from '../../assets/video/banner.mp4';
import logoImg from '../../assets/images/logo.jpeg';
import './Hero.css';

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: `${Math.random() * 100}%`,
  duration: `${Math.random() * 6 + 6}s`,
  delay: `${Math.random() * 5}s`,
}));

export const Hero = () => {
  return (
    <section id="inicio" className="hero" aria-label="Sección de bienvenida">
      {/* Video Banner */}
      <video
        className="hero__video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Particles */}
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              bottom: `${Math.random() * 30}%`,
              ['--duration' as string]: p.duration,
              ['--delay' as string]: p.delay,
            }}
          />
        ))}
      </div>

      {/* Overlays */}
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__shimmer" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        <img
          src={logoImg}
          alt="Logo Énfasis Food"
          className="hero__logo"
          width={130}
          height={130}
        />

        <p className="hero__eyebrow">🍟 Sabor que marca la diferencia</p>

        <h1 className="hero__title">
          La Salchipapa
          <span>Perfecta</span>
        </h1>

        <p className="hero__subtitle">
          Ingredientes frescos, sazón única y el cariño de siempre.
          Pídela a domicilio y hazla llegar hasta tu puerta.
        </p>

        <div className="hero__cta-group">
          <Button
            id="hero-ver-menu-btn"
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver el Menú 🍟
          </Button>
          <Button
            id="hero-pedir-btn"
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open(
                'https://api.whatsapp.com/send/?phone=573205069834',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Pedir por WhatsApp
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-dot" />
        <span>Scroll</span>
      </div>
    </section>
  );
};
