'use client';

import HeroSection from './components/HeroSection/index';
import PromoSection from './components/PromoSection/index';
import { ThemeProvider } from '@/context/ThemeContext';
import { TranslationProvider } from '@/i18n';
import {heroSlides}from  '../data/heroSlides'

export default function HomePage() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <main>
          <HeroSection slides={heroSlides} />
          <PromoSection />
        </main>
      </TranslationProvider>
    </ThemeProvider>
  );
}
