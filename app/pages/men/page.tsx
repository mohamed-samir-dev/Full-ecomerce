"use client";

import { useCart } from '@/hooks/useCart';
import { useTheme } from '@/context/ThemeContext';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import CategoryGrid from '@/app/components/CategoryGrid';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';
import { useTranslation } from '@/i18n';

export default function MenPage() {
  const { products, trendingProducts, loading } = useCategoryProducts('Men');
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const categories = [
    { name: t('men.category.apparel'), image: '/images/men-apparel.avif', slug: 'apparel' },
    { name: t('men.category.shoes'), image: '/images/men-shoes.avif', slug: 'shoes' },
    { name: t('men.category.bags'), image: '/images/men-bags.avif', slug: 'bags' },
    { name: t('men.category.accessories'), image: '/images/men-accessories.avif', slug: 'accessories' }
  ];

  return (
    <>
      <DynamicMetadata
        titleAr="رجال - أزياء رجالية عصرية"
        titleEn="Men - Modern Men's Fashion"
        descriptionAr="اكتشف أحدث صيحات الموضة الرجالية. ملابس، أحذية، حقائب وإكسسوارات"
        descriptionEn="Discover the latest men's fashion trends. Clothing, shoes, bags and accessories"
        keywordsAr={['رجال', 'ملابس رجالية', 'أزياء رجالية']}
        keywordsEn={['men', 'men\'s clothing', 'men\'s fashion']}
      />
      <div className={`${
      isDarkMode ? 'bg-[#191C21] text-white' : 'bg-white text-gray-900'
    } min-h-screen py-3 sm:py-5 transition-colors duration-300`}>
      <HeroBanner 
        image="/images/men-page.avif" 
        title={t('men.hero.title')} 
        description={t('men.hero.description')} 
        buttonText={t('men.hero.button')} 
        buttonLink="/pages/men/collection" 
        buttonColor="#1E3A8A" 
        buttonHoverColor="#1E40AF" 
      />
      <ProductSlider 
        title={t('men.newArrivals.title')} 
        products={products} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#1E3A8A" 
      />
      <ProductSlider 
        title={t('men.trending.title')} 
        products={trendingProducts} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#1E3A8A" 
      />
      <CategoryGrid categories={categories} basePath="/pages/men" />
    </div>
    </>
  );
}
