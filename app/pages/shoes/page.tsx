"use client";

import HeroBanner from '@/app/components/HeroBanner';
import BrowseCategories from '@/app/components/BrowseCategories';
import ProductSlider from '@/app/components/ProductSlider';
import { useSubCategoryProducts } from '@/app/hooks/category/useSubCategoryProducts';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function ShoesPage() {
  const { products, loading } = useSubCategoryProducts('Shoes', 7, 'Trending');
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const categories = [
    { image: '/images/formal-shoes.avif', title: t('shoes.category.formal'), link: '/pages/shoes/formal', size: 'large' as const },
    { image: '/images/summer sandals.avif', title: t('shoes.category.sandals'), link: '/pages/shoes/sandals', size: 'small' as const },
    { image: '/images/casualshoes (1).avif', title: t('shoes.category.casual'), link: '/pages/shoes/casual', size: 'small' as const },
    { image: '/images/sport-shoes.avif', title: t('shoes.category.sports'), link: '/pages/shoes/sports', size: 'large' as const },
  ];

  return (
    <div className={`${
      isDarkMode ? 'bg-[#191C21] text-white' : 'bg-white text-gray-900'
    } min-h-screen py-3 sm:py-5 transition-colors duration-300`}>
      <HeroBanner 
        image="/images/shoes-page.avif" 
        title={t('shoes.hero.title')} 
        description={t('shoes.hero.description')} 
        buttonText={t('shoes.hero.button')} 
        buttonLink="/pages/shoes/collection" 
        buttonColor="#262425" 
        buttonHoverColor="#050505" 
      />
      <BrowseCategories categories={categories} />
      <ProductSlider 
        title={t('shoes.trending.title')} 
        products={products} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#18020B" 
      />
    </div>
  );
}
