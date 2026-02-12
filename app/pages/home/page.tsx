'use client';

import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection/index';
import {heroSlides}from  './data/homeData'
import { HomePageSchemas } from '@/app/components/JsonLd';
import DynamicMetadata from '@/app/components/DynamicMetadata';

const PromoSection = dynamic(() => import('./components/PromoSection/index'), { ssr: true });
const FeaturedProducts = dynamic(() => import('./components/FeaturedProducts/index'), { ssr: true, loading: () => <div className="h-96" /> });
const CustomerSaySection = dynamic(() => import('./components/CustomerSay/index'), { ssr: false, loading: () => <div className="h-64" /> });
const ClothesHangerSection = dynamic(() => import('./components/ClothesHangerSection/index'), { ssr: false, loading: () => <div className="h-64" /> });
const LuxuryCategorySection = dynamic(() => import('./components/LuxuryCategorySection/index'), { ssr: false, loading: () => <div className="h-64" /> });
const LuxuryPromoSection = dynamic(() => import('./components/LuxuryPromoSection/index'), { ssr: false, loading: () => <div className="h-64" /> });
const NewsletterSection = dynamic(() => import('./components/NewsletterSection/index'), { ssr: false, loading: () => <div className="h-48" /> });

export default function HomePage() {
  return (
    <>
      <DynamicMetadata
        titleAr="الصفحة الرئيسية - متجر عالمي للتسوق الإلكتروني"
        titleEn="Home - Your Premier Online Shopping Destination"
        descriptionAr="متجر إلكتروني شامل يوفر أفضل المنتجات من ملابس رجالية ونسائية وأطفال، أحذية، إكسسوارات، إلكترونيات ومستلزمات الحيوانات الأليفة بأسعار تنافسية وجودة عالية"
        descriptionEn="Comprehensive online store offering the best products including men's, women's and children's clothing, shoes, accessories, electronics and pet supplies at competitive prices with high quality"
        keywordsAr={['تسوق أونلاين', 'متجر إلكتروني', 'ملابس', 'أحذية', 'إكسسوارات']}
        keywordsEn={['online shopping', 'ecommerce', 'clothing', 'shoes', 'accessories']}
      />
      <HomePageSchemas />
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
    </>
  );
}
