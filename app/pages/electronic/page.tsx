"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import Image from 'next/image';
import Link from 'next/link';
import ProductSlider from '@/app/components/ProductSlider';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';
import { useTranslation } from '@/i18n';

export default function MenPage() {
  const { products, loading } = useCategoryProducts('electronic');
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const categories = [
    { title: t('electronic.category.audio'), image: '/images/headphones.avif', slug: 'audio' },
    { title: t('electronic.category.smartHome'), image: '/images/smart-home.avif', slug: 'smart-home' },
    { title: t('electronic.category.personalTech'), image: '/images/personal-tech.avif', slug: 'personal-tech' },
    { title: t('electronic.category.photography'), image: '/images/camera.avif', slug: 'photography' },
  ];

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner 
        image="/images/electronic-page.webp" 
        title={t('electronic.hero.title')} 
        description={t('electronic.hero.description')} 
        buttonText={t('electronic.hero.button')} 
        buttonLink="/pages/electronic/collection" 
        buttonColor="#1E3A8A" 
        buttonHoverColor="#1E40AF" 
      />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={`/pages/electronic/${category.slug}`}>
              <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Image 
                  src={category.image} 
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="absolute bottom-4 left-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      <ProductSlider title={t('electronic.products.title')} products={products} loading={loading} onAddToCart={addToCart} accentColor="#1E3A8A" />

      </section>
    </div>
  );
}