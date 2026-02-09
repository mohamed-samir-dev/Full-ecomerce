"use client";

import { useFilters } from "../hooks/useFilters";
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import {
  PageHeader,
  FilterSidebar,
  ProductsSection,
} from "./index";

export default function ShopPageContent() {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const {
    filters,
    showMobileFilters,
    showCategoryDropdown,
    showBrandDropdown,
    showSizeDropdown,
    showColorDropdown,
    showAvailabilityDropdown,
    showMaterialDropdown,
    showShopDropdown,
    setShowMobileFilters,
    setShowCategoryDropdown,
    setShowBrandDropdown,
    setShowSizeDropdown,
    setShowColorDropdown,
    setShowAvailabilityDropdown,
    setShowMaterialDropdown,
    setShowShopDropdown,
    handleFilterChange,
    handleArrayFilterChange,
    clearAllFilters,
    hasActiveFilters,
  } = useFilters();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:gap-10 lg:flex-row">
          <aside className="w-full lg:w-80 lg:shrink-0">
            <div className="lg:sticky lg:top-4">
              <FilterSidebar
                filters={filters}
                showMobileFilters={showMobileFilters}
                showCategoryDropdown={showCategoryDropdown}
                showBrandDropdown={showBrandDropdown}
                showSizeDropdown={showSizeDropdown}
                showColorDropdown={showColorDropdown}
                showAvailabilityDropdown={showAvailabilityDropdown}
                showMaterialDropdown={showMaterialDropdown}
                showShopDropdown={showShopDropdown}
                setShowMobileFilters={setShowMobileFilters}
                setShowCategoryDropdown={setShowCategoryDropdown}
                setShowBrandDropdown={setShowBrandDropdown}
                setShowSizeDropdown={setShowSizeDropdown}
                setShowColorDropdown={setShowColorDropdown}
                setShowAvailabilityDropdown={setShowAvailabilityDropdown}
                setShowMaterialDropdown={setShowMaterialDropdown}
                setShowShopDropdown={setShowShopDropdown}
                handleFilterChange={handleFilterChange}
                handleArrayFilterChange={handleArrayFilterChange}
                clearAllFilters={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </aside>
          <main className="flex-1">
            <ProductsSection 
              filters={filters} 
              handleFilterChange={handleFilterChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
}