'use client';

import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection/index';
import {heroSlides}from  './data/homeData'

const PromoSection = dynamic(() => import('./components/PromoSection/index'), { ssr: true });
const FeaturedProducts = dynamic(() => import('./components/FeaturedProducts/index'), { ssr: false });
const CustomerSaySection = dynamic(() => import('./components/CustomerSay/index'), { ssr: false });
const ClothesHangerSection = dynamic(() => import('./components/ClothesHangerSection/index'), { ssr: false });
const LuxuryCategorySection = dynamic(() => import('./components/LuxuryCategorySection/index'), { ssr: false });
const LuxuryPromoSection = dynamic(() => import('./components/LuxuryPromoSection/index'), { ssr: false });
const NewsletterSection = dynamic(() => import('./components/NewsletterSection/index'), { ssr: false });

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
