import { useState } from 'react';

export const useSwipeGesture = (onPrevious: () => void, onNext: () => void, minDistance = 50) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minDistance) onNext();
    if (distance < -minDistance) onPrevious();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    const distance = dragStart - e.clientX;
    if (distance > minDistance) onNext();
    if (distance < -minDistance) onPrevious();
    setIsDragging(false);
    setDragStart(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  return {
    isDragging,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
};
