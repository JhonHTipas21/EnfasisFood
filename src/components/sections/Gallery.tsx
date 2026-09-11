// ================================================================
// ÉNFASIS FOOD — Gallery Section
// ================================================================
import { useIntersection } from '../../hooks/useIntersection';
import { SectionHeader } from '../ui/SectionHeader';
import sencillaImg from '../../assets/images/sencilla.jpeg';
import especialImg from '../../assets/images/especial.jpeg';
import especialDobleImg from '../../assets/images/especialpara2.jpeg';
import chiquitoImg from '../../assets/images/chiquito.jpeg';
import cosotaImg from '../../assets/images/la-cosota.jpeg';
import './Gallery.css';

const GALLERY_IMAGES = [
  { src: cosotaImg, label: 'La Cosota — XXL', position: 'center 75%' },
  { src: especialImg, label: 'Especial', position: 'center 55%' },
  { src: especialDobleImg, label: 'Especial Doble', position: 'center 60%' },
  { src: chiquitoImg, label: 'El Chiquito III', position: 'center 65%' },
  { src: sencillaImg, label: 'Sencilla', position: 'center 75%' },
];

const GalleryItem = ({
  src,
  label,
  position,
  index,
}: {
  src: string;
  label: string;
  position?: string;
  index: number;
}) => {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`gallery-item ${isVisible ? 'gallery-item--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <img
        src={src}
        alt={label}
        className="gallery-item__img"
        style={position ? { objectPosition: position } : undefined}
        loading="lazy"
      />
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
          <GalleryItem
            key={img.src}
            src={img.src}
            label={img.label}
            position={img.position}
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);
