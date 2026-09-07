// ================================================================
// ÉNFASIS FOOD — Button Component (Atomic UI)
// ================================================================
import './Button.css';
import type { ButtonProps } from '../../types';

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  id,
  children,
  className = '',
}: ButtonProps) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      id={id}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
};
