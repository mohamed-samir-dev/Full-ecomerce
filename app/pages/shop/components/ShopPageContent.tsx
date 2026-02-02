"use client";

import { useFilters } from "../hooks/useFilters";
import {
  PageHeader,
  FilterSidebar,
  ProductsSection,
} from "./index";

export default function ShopPageContent() {
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
    <div className="min-h-screen bg-white">
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
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
          <div className="flex-1 min-w-0">
            <ProductsSection 
              filters={filters} 
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}