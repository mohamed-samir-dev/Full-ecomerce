'use client';

import DynamicMetadata from '@/app/components/DynamicMetadata';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useFilteredProducts } from '@/hooks/shared/useFilteredProducts';
import PageHeader from '@/app/components/shared/PageHeader';
import Filters from '@/app/components/shared/Filters';
import ProductGrid from '@/app/components/shared/ProductGrid';
import Pagination from '@/app/pages/shop/components/Pagination';

export default function SalePage() {
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
  } = useFilteredProducts({ discount: 50 });

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 absolute inset-0"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DynamicMetadata titleAr="تخفيضات كبرى" titleEn="Big Sale" descriptionAr="تخفيضات تصل إلى 50%" descriptionEn="Discounts up to 50%" keywordsAr={['تخفيضات', 'خصم']} keywordsEn={['sale', 'discount']} />
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <div dir={isArabic ? 'rtl' : 'ltr'}>
          <PageHeader 
            title={isArabic ? 'تخفيضات كبرى' : 'Big Sale'}
            titleAr="تخفيضات كبرى"
            bgColor="#FEF2F2"
            iconColor="#EF4444"
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
            badgeText="50% OFF"
            badgeTextAr="خصم 50%"
            badgeColor="#EF4444"
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
