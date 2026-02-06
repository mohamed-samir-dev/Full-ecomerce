"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import BrowseCategories from '@/app/components/BrowseCategories';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';
import Image from 'next/image';
import { useTranslation } from '@/i18n';

export default function PetSuppliesPage() {
  const { products, trendingProducts, loading } = useCategoryProducts('pet');
  const { addToCart } = useCart();
  const { t } = useTranslation();
  
  const categories = [
    { image: '/images/Toy.avif', title: t('pet.category.toys'), link: '/pages/PetSupplies/toys', size: 'large' as const },
    { image: '/images/Care.avif', title: t('pet.category.care'), link: '/pages/PetSupplies/care', size: 'small' as const },
    { image: '/images/Beds.avif', title: t('pet.category.beds'), link: '/pages/PetSupplies/beds', size: 'small' as const },
    { image: '/images/Food & Treats.avif', title: t('pet.category.food'), link: '/pages/PetSupplies/food', size: 'large' as const },
  ];
  
  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner 
        image="/images/pet-page.webp" 
        title={t('pet.hero.title')} 
        description={t('pet.hero.description')} 
        buttonText={t('pet.hero.button')} 
        buttonLink="/pages/PetSupplies/collection" 
        buttonColor="#839A7E" 
        buttonHoverColor="#61755C" 
      />
      
      <div className="w-full py-12 sm:py-16 bg-[#F7F3ED] ">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <div className="md:w-2/5">
              <Image src="/images/still-life-pet-food-composition.avif" alt="Pet products" width={600} height={400} className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="md:w-1/2 space-y-6 md:mt-8">
              <div className="inline-block bg-[#839A7E] text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">{t('pet.quality.badge')}</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#493B30] leading-tight">{t('pet.quality.title')}</h2>
              <p className="text-lg text-[#746C5F] leading-relaxed">{t('pet.quality.description')}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-[#493B30] font-medium">{t('pet.quality.organic')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-[#493B30] font-medium">{t('pet.quality.eco')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-[#493B30] font-medium">{t('pet.quality.vet')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrowseCategories categories={categories} buttonBgColor="#839A7E" buttonTextColor="#FFFFFF" buttonHoverColor="#61755C" />
      <ProductSlider title={t('pet.newProducts.title')} products={products} loading={loading} onAddToCart={addToCart} accentColor="#839A7E" />
      <ProductSlider title={t('pet.trending.title')} products={trendingProducts} loading={loading} onAddToCart={addToCart} accentColor="#839A7E" />
    </div>
  );}
