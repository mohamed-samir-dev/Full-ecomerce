import Image from 'next/image';
import { X } from 'lucide-react';
import { ImageModalProps } from '../../types/types';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import NavigationButtons from './NavigationButtons';
import ImageCounter from './ImageCounter';

export default function ImageModal({ isOpen, images, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const goToPrevious = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < (images?.length || 0) - 1) onNavigate(currentIndex + 1);
  };

  const {
    isDragging,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useSwipeGesture(goToPrevious, goToNext);

  useKeyboardNavigation(isOpen, currentIndex, onClose, goToPrevious, goToNext);

  if (!isOpen || !images?.length) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="relative max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] sm:max-h-[80vh] w-full animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute -top-8 sm:-top-12 right-0 z-10 p-2 sm:p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <NavigationButtons
          currentIndex={currentIndex}
          totalImages={images?.length || 0}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
        
        <div 
          className={`relative bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <Image
            src={images?.[currentIndex] || ''}
            alt={`Image ${currentIndex + 1} of ${images?.length || 0}`}
            width={1200}
            height={800}
            className={`w-full h-auto max-h-[90vh] sm:max-h-[80vh] object-contain select-none ${isDragging ? 'pointer-events-none' : ''}`}
            priority
            draggable={false}
          />
          <ImageCounter currentIndex={currentIndex} totalImages={images?.length || 0} />
        </div>
      </div>
    </div>
  );
}
