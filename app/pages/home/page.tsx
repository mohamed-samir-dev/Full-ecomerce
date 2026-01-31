'use client';

import HeroSection from './components/HeroSection/index';
import CategorySection from './components/CategorySection/index';
import PromoSection from './components/PromoSection/index';
import FeaturedProducts from './components/FeaturedProducts/index';
import CustomerSaySection from './components/CustomerSay/index';
import { ThemeProvider } from '@/context/ThemeContext';
import { TranslationProvider } from '@/i18n';
import {heroSlides}from  './data/homeData'

export default function HomePage() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <main>
          <HeroSection slides={heroSlides} />
          <PromoSection />
          <CategorySection />
          <FeaturedProducts />
          <CustomerSaySection />
        </main>
      </TranslationProvider>
    </ThemeProvider>
  );
}
