'use client';

import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection/index';
import {heroSlides}from  './data/homeData'

const PromoSection = dynamic(() => import('./components/PromoSection/index'), { ssr: true });
const FeaturedProducts = dynamic(() => import('./components/FeaturedProducts/index'), { ssr: false, loading: () => <div className="h-96" /> });
const CustomerSaySection = dynamic(() => import('./components/CustomerSay/index'), { ssr: false, loading: () => <div className="h-64" /> });
const ClothesHangerSection = dynamic(() => import('./components/ClothesHangerSection/index'), { ssr: false, loading: () => <div className="h-64" /> });
const LuxuryCategorySection = dynamic(() => import('./components/LuxuryCategorySection/index'), { ssr: false, loading: () => <div className="h-64" /> });
const LuxuryPromoSection = dynamic(() => import('./components/LuxuryPromoSection/index'), { ssr: false, loading: () => <div className="h-64" /> });
const NewsletterSection = dynamic(() => import('./components/NewsletterSection/index'), { ssr: false, loading: () => <div className="h-48" /> });

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
