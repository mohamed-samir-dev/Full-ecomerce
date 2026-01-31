import { useEffect } from 'react';

export const useKeyboardNavigation = (
  isOpen: boolean,
  currentIndex: number,
  onClose: () => void,
  onPrevious: () => void,
  onNext: () => void
) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrevious();
        if (e.key === 'ArrowRight') onNext();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, currentIndex, onClose, onPrevious, onNext]);
};
