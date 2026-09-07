// ================================================================
// ÉNFASIS FOOD — Gallery Section
// ================================================================
import { useIntersection } from '../../hooks/useIntersection';
import { SectionHeader } from '../ui/SectionHeader';
import prod1 from '../../assets/images/producto-1.jpeg';
import prod2 from '../../assets/images/producto-2.jpeg';
import prod3 from '../../assets/images/producto-3.jpeg';
import prod4 from '../../assets/images/producto-4.jpeg';
import prod5 from '../../assets/images/producto-5.jpeg';
import './Gallery.css';

const GALLERY_IMAGES = [
  { src: prod4, label: 'La Cosota — XXL' },
  { src: prod1, label: 'Especial' },
  { src: prod2, label: 'Especial Doble' },
  { src: prod3, label: 'El Chiquito III' },
  { src: prod5, label: 'Sencilla Doble' },
];

const GalleryItem = ({
  src,
  label,
  index,
}: {
  src: string;
  label: string;
  index: number;
}) => {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`gallery-item ${isVisible ? 'gallery-item--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <img src={src} alt={label} className="gallery-item__img" loading="lazy" />
      <div className="gallery-item__overlay">
        <span className="gallery-item__label">🍟 {label}</span>
      </div>
    </div>
  );
};

export const Gallery = () => (
  <section id="galeria" className="gallery-section section" aria-label="Galería de productos">
    <div className="container">
      <SectionHeader
        eyebrow="Galería"
        title="Hecho con Amor"
        subtitle="Cada salchipapa es preparada al momento para ti. Mira el resultado."
        centered
      />
      <div className="gallery-grid" role="list" aria-label="Imágenes de productos">
        {GALLERY_IMAGES.map((img, i) => (
          <GalleryItem key={img.src} src={img.src} label={img.label} index={i} />
        ))}
      </div>
    </div>
  </section>
);
