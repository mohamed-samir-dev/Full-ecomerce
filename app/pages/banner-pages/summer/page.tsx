'use client';

import DynamicMetadata from '@/app/components/DynamicMetadata';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useFilteredProducts } from '@/hooks/shared/useFilteredProducts';
import PageHeader from '@/app/components/shared/PageHeader';
import Filters from '@/app/components/shared/Filters';
import ProductGrid from '@/app/components/shared/ProductGrid';
import Pagination from '@/app/pages/shop/components/Pagination';

export default function SummerPage() {
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
  } = useFilteredProducts({ thirdtype: 'Summer' });

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-400 absolute inset-0"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DynamicMetadata titleAr="منتجات الصيف" titleEn="Summer Collection" descriptionAr="اكتشف أحدث منتجات الصيف" descriptionEn="Discover the latest summer products" keywordsAr={['صيف', 'منتجات']} keywordsEn={['summer', 'collection']} />
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'} transition-colors duration-300`}>
        <div dir={isArabic ? 'rtl' : 'ltr'}>
          <PageHeader
            title={isArabic ? 'منتجات الصيف' : 'Summer Collection'}
            titleAr="منتجات الصيف"
            bgColor="#FFF7ED"
            iconColor="#F97316"
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
            badgeText="SUMMER"
            badgeTextAr="صيف"
            badgeColor="#F97316"
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
