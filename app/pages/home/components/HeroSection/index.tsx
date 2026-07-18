'use client';

import Image from 'next/image';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { HeroSectionProps } from '../../types/home.types';
import { useSlideNavigation } from '../../hooks/useSlideNavigation';
import { BackgroundImage } from './components/BackgroundImage';
import { HeroContent } from './components/HeroContent';
import { HeroImage } from './components/HeroImage';
import { NavigationIndicator } from './components/NavigationIndicator';

export default function HeroSection({ slides }: HeroSectionProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const {
    currentSlide,
    setCurrentSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSlideNavigation(slides.length);

  const currentSlideData = slides[currentSlide];
  const altText = String(t(currentSlideData.titleKey));

  const isFirstSlide = currentSlide === 0;

  if (isFirstSlide) {
    return (
      <div
        className="relative overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]"
        dir={isArabic ? 'rtl' : 'ltr'}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={currentSlideData.image}
          alt={altText}
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
        />
        {/* gradient من اليسار فقط عشان النص يقرأ والصورة تبان */}
        <div className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/70 via-black/30 to-transparent`} />
        <div className={`relative z-10 flex items-center min-h-[420px] sm:min-h-[480px] lg:min-h-[560px] ${
            isArabic ? 'justify-end' : 'justify-start'
          }`}>
          <HeroContent
            slide={currentSlideData}
            currentSlide={currentSlide}
            isArabic={isArabic}
            t={t}
          />
        </div>
        <NavigationIndicator
          totalSlides={slides.length}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#F1F1F0]'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <BackgroundImage 
        slide={currentSlideData} 
        currentSlide={currentSlide} 
        altText={altText} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[400px] sm:min-h-[450px] lg:min-h-0">
          <HeroContent 
            slide={currentSlideData}
            currentSlide={currentSlide}
            isArabic={isArabic}
            t={t}
          />
          <HeroImage 
            slide={currentSlideData}
            currentSlide={currentSlide}
            altText={altText}
          />
        </div>
      </div>
      
      <NavigationIndicator 
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
    </div>
  );
}
