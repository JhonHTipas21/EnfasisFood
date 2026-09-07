// ================================================================
// ÉNFASIS FOOD — Modal Component
// ================================================================
import { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';
import type { ModalProps } from '../../types';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal">
        {title && (
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button
              id="modal-close-btn"
              className="modal__close"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};
