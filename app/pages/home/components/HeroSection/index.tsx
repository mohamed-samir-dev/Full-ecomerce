'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { HeroSectionProps } from '../../types/home.types';
import { useSlideNavigation } from '../../hooks/useSlideNavigation';
import { BackgroundImage } from './components/BackgroundImage';
import { HeroContent } from './components/HeroContent';
import { HeroImage } from './components/HeroImage';
import { NavigationIndicator } from './components/NavigationIndicator';

export default function HeroSection({ slides }: HeroSectionProps) {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  const {
    currentSlide,
    setCurrentSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSlideNavigation(slides.length);

  const currentSlideData = slides[currentSlide];
  const altText = String(t(currentSlideData.titleKey));

  return (
    <div 
      className={`relative overflow-hidden ${
        isDarkMode ? 'bg-[#191C21]' : 'bg-[#F1F1F0]'
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[500px] sm:min-h-[600px] lg:min-h-0">
          <HeroContent 
            slide={currentSlideData}
            currentSlide={currentSlide}
            isDarkMode={isDarkMode}
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
