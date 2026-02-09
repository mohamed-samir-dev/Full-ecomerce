'use client';

import DynamicMetadata from '@/app/components/DynamicMetadata';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useFilteredProducts } from '@/hooks/shared/useFilteredProducts';
import PageHeader from '@/app/components/shared/PageHeader';
import Filters from '@/app/components/shared/Filters';
import ProductGrid from '@/app/components/shared/ProductGrid';
import Pagination from '@/app/pages/shop/components/Pagination';

export default function PremiumPage() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const {
    products,
    loading,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    categories,
    currentPage,
    totalPages,
    onPageChange,
    totalProducts
  } = useFilteredProducts({ thirdtype: 'premium' });

  if (loading) {
    return (
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'
      } flex items-center justify-center`}>
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600 absolute inset-0"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DynamicMetadata titleAr="منتجات مميزة" titleEn="Premium Products" descriptionAr="منتجات مميزة بجودة عالية" descriptionEn="Premium products with high quality" keywordsAr={['مميز', 'جودة']} keywordsEn={['premium', 'quality']} />
      <div className={`min-h-screen ${
      isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div dir={isArabic ? 'rtl' : 'ltr'}>
        <PageHeader 
          title={isArabic ? 'منتجات مميزة' : 'Premium Products'}
          titleAr="منتجات مميزة"
          bgColor="#FFFBEB"
          iconColor="#D97706"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <Filters
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          productsCount={totalProducts}
          isArabic={isArabic}
        />

        <ProductGrid 
          products={products}
          badgeText="PREMIUM"
          badgeTextAr="مميز"
          badgeColor="#D97706"
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      </div>
    </>
  );
}
