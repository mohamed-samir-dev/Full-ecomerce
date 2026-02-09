"use client";

import { useCart } from '@/hooks/useCart';
import { useTheme } from '@/context/ThemeContext';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import CategoryGrid from '@/app/components/CategoryGrid';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';
import { useTranslation } from '@/i18n';

export default function WomenPage() {
  const { products, trendingProducts, loading } = useCategoryProducts('Women');
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const categories = [
    { name: t('women.category.apparel'), image: '/images/clothes-clothing-shop.avif', slug: 'apparel' },
    { name: t('women.category.shoes'), image: '/images/shoes.avif', slug: 'shoes' },
    { name: t('women.category.bags'), image: '/images/bag.avif', slug: 'bags' },
    { name: t('women.category.accessories'), image: '/images/accesory.avif', slug: 'accessories' },
    { name: t('women.category.beauty'), image: '/images/beouty.webp', slug: 'beauty' }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#191C21] text-white' : 'bg-white text-gray-900'} min-h-screen py-3 sm:py-5 transition-colors duration-300`}>
      <HeroBanner 
        image="/images/women-page.avif" 
        title={t('women.hero.title')} 
        description={t('women.hero.description')} 
        buttonText={t('women.hero.button')} 
        buttonLink="/pages/women/collection" 
        buttonColor="#C11069" 
        buttonHoverColor="#6D093B" 
      />
      <ProductSlider 
        title={t('women.newArrivals.title')} 
        products={products} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#C11069" 
      />
      <ProductSlider 
        title={t('women.trending.title')} 
        products={trendingProducts} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#C11069" 
      />
      <CategoryGrid categories={categories} basePath="/pages/women" />
    </div>
  );
}
