'use client';

import HeroSection from './components/HeroSection/index';
import PromoSection from './components/PromoSection/index';
import FeaturedProducts from './components/FeaturedProducts/index';
import CustomerSaySection from './components/CustomerSay/index';
import ClothesHangerSection from './components/ClothesHangerSection/index';
import LuxuryCategorySection from './components/LuxuryCategorySection/index';
import LuxuryPromoSection from './components/LuxuryPromoSection/index';
import NewsletterSection from './components/NewsletterSection/index';
import {heroSlides}from  './data/homeData'

export default function HomePage() {
  return (
    <main>
      <HeroSection slides={heroSlides} />
      <PromoSection />
      <LuxuryPromoSection />
      <ClothesHangerSection />
      <LuxuryCategorySection />
      <FeaturedProducts />
      <CustomerSaySection />
      <NewsletterSection />
    </main>
  );
}
