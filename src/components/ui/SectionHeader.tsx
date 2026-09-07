// ================================================================
// ÉNFASIS FOOD — SectionHeader Component
// ================================================================
import './SectionHeader.css';
import type { SectionHeaderProps } from '../../types';

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) => (
  <header
    className={`section-header ${centered ? 'section-header--centered' : ''}`}
  >
    {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
    <h2 className="section-header__title">{title}</h2>
    {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
  </header>
);
