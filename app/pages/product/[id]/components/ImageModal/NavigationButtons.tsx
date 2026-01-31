import { ChevronLeft, ChevronRight } from 'lucide-react';
import {NavigationButtonsProps}from '../../types/types'


export default function NavigationButtons({ currentIndex, totalImages, onPrevious, onNext }: NavigationButtonsProps) {
  if (totalImages <= 1) return null;

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        disabled={currentIndex === 0}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={currentIndex === totalImages - 1}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>
  );
}
