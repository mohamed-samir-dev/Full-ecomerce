"use client";

import { useCart } from '@/hooks/useCart';
import { useTheme } from '@/context/ThemeContext';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import CategoryGrid from '@/app/components/CategoryGrid';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';
import { useTranslation } from '@/i18n';

export default function KidsPage() {
  const { products, loading } = useCategoryProducts('Kids');
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const categories = [
    { name: t('kids.category.apparel'), image: '/images/kid-apparel.avif', slug: 'apparel' },
    { name: t('kids.category.shoes'), image: '/images/shoes-kid.avif', slug: 'shoes' },
    { name: t('kids.category.bags'), image: '/images/kid-bag.avif', slug: 'bags' },
    { name: t('kids.category.toys'), image: '/images/kid-toys.avif', slug: 'toys' }
  ];

  const apparelProducts = products.filter(p => p.subCategory?.toLowerCase() === 'apparel' && p.toplay === true);
  const toysProducts = products.filter(p => p.subCategory?.toLowerCase().includes('toy'));

  return (
    <div className={`${
      isDarkMode ? 'bg-[#191C21] text-white' : 'bg-white text-gray-900'
    } min-h-screen py-3 sm:py-5 transition-colors duration-300`}>
      <HeroBanner 
        image="/images/kid-page.webp" 
        title={t('kids.hero.title')} 
        description={t('kids.hero.description')} 
        buttonText={t('kids.hero.button')} 
        buttonLink="/pages/kids/collection" 
        buttonColor="#F59E0B" 
        buttonHoverColor="#D97706" 
      />
      <ProductSlider 
        title={t('kids.newArrivals.title')} 
        products={products} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#F59E0B" 
      />
      <ProductSlider 
        title={t('kids.apparel.title')} 
        products={apparelProducts} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#F59E0B" 
      />
      <ProductSlider 
        title={t('kids.toys.title')} 
        products={toysProducts} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#F59E0B" 
      />
      <CategoryGrid categories={categories} basePath="/pages/kids" />
    </div>
  );
}
