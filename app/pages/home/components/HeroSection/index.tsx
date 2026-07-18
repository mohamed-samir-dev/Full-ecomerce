'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/i18n';
import { HeroSectionProps } from '../../types/home.types';
import { HeroContent } from './components/HeroContent';

export default function HeroSection({ slides }: HeroSectionProps) {
  const { t, isArabic } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = useCallback(() => setCurrentSlide(i => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div
      className="relative overflow-hidden min-h-[360px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[620px]"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={String(t(slide.titleKey))}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={85}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isArabic
                ? 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)'
                : 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />
        </div>
      ))}

      <div className="relative z-20 flex items-center min-h-[360px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[620px]">
        <HeroContent slide={slides[currentSlide]} isArabic={isArabic} t={t} slideIndex={currentSlide} />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${i === currentSlide ? 'w-6 h-2 bg-[#C9A84C]' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
