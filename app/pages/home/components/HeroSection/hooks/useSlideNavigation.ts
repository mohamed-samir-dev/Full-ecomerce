import { useState, useEffect, useRef } from 'react';

export const useSlideNavigation = (slidesLength: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide(prev => prev === slidesLength - 1 ? 0 : prev + 1);
    }
    if (isRightSwipe) {
      setCurrentSlide(prev => prev === 0 ? slidesLength - 1 : prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => prev === 0 ? slidesLength - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => prev === slidesLength - 1 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slidesLength]);

  return {
    currentSlide,
    setCurrentSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
