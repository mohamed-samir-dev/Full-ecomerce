"use client";

import { Filters, FilterChangeHandler, ArrayFilterChangeHandler } from "../types";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useTranslation } from '@/i18n';

interface FilterSidebarProps {
  filters: Filters;
  showMobileFilters: boolean;
  showCategoryDropdown: boolean;
  showBrandDropdown: boolean;
  showSizeDropdown: boolean;
  showColorDropdown: boolean;
  showAvailabilityDropdown: boolean;
  showMaterialDropdown: boolean;
  showShopDropdown: boolean;
  setShowMobileFilters: (show: boolean) => void;
  setShowCategoryDropdown: (show: boolean) => void;
  setShowBrandDropdown: (show: boolean) => void;
  setShowSizeDropdown: (show: boolean) => void;
  setShowColorDropdown: (show: boolean) => void;
  setShowAvailabilityDropdown: (show: boolean) => void;
  setShowMaterialDropdown: (show: boolean) => void;
  setShowShopDropdown: (show: boolean) => void;
  handleFilterChange: FilterChangeHandler;
  handleArrayFilterChange: ArrayFilterChangeHandler;
  clearAllFilters: () => void;
  hasActiveFilters: () => boolean;
}

export default function FilterSidebar({
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
}: FilterSidebarProps) {
  const { filterOptions, loading } = useFilterOptions();
  const { t, isArabic } = useTranslation();

  const availabilityLabels = {
    in_stock: t('shop.inStock'),
    out_of_stock: t('shop.outOfStock'),
    pre_order: t('shop.preOrder')
  };

  if (loading) {
    return (
      <div className="lg:w-80 xl:w-72 shrink-0">
        <div className="rounded-lg p-4 sm:p-6 shadow-sm border bg-white border-gray-200">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="mb-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-3 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-80 xl:w-72 shrink-0" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
        >
          <span className="font-medium flex items-center gap-2">
            {t('shop.filters')}
            {hasActiveFilters() && (
              <span className="bg-[#B39E7A] text-white text-xs px-2 py-0.5 rounded-full">
                {t('shop.active')}
              </span>
            )}
          </span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform ${
              showMobileFilters ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          showMobileFilters ? "block" : "hidden"
        } lg:block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm`}
      >
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-gray-900">{t('shop.filters')}</h2>
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#B39E7A] hover:text-[#A08D6A] transition-colors"
            >
              {t('shop.clearAll')}
            </button>
          )}
        </div>

        {/* Category Filter */}
        <FilterSection
          title={t('shop.category')}
          items={filterOptions.categories}
          filterKey="category"
          isOpen={showCategoryDropdown}
          setIsOpen={setShowCategoryDropdown}
          filters={filters}
          handleArrayFilterChange={handleArrayFilterChange}
        />

        {/* Brand Filter */}
        <FilterSection
          title={t('shop.brand')}
          items={filterOptions.brands}
          filterKey="brand"
          isOpen={showBrandDropdown}
          setIsOpen={setShowBrandDropdown}
          filters={filters}
          handleArrayFilterChange={handleArrayFilterChange}
        />

        {/* Price Range Filter */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">
            {t('shop.price')}
          </h3>
          <input
            type="range"
            min={filterOptions.priceRange.minPrice}
            max={filterOptions.priceRange.maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B39E7A] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-sm font-medium text-gray-700 mt-3">
            <span className="bg-amber-50 px-3 py-1 rounded-full">{filters.priceRange[0]} {isArabic ? 'جنيه' : 'EGP'}</span>
            <span className="bg-amber-50 px-3 py-1 rounded-full">{filters.priceRange[1]} {isArabic ? 'جنيه' : 'EGP'}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider flex items-center justify-between">
            <span>{t('shop.rating')}</span>
            {filters.rating.length > 0 && (
              <span className="bg-[#B39E7A] text-white text-xs px-2 py-0.5 rounded-full">
                {filters.rating.length}
              </span>
            )}
          </h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.rating.includes(rating.toString())}
                  onChange={() => handleArrayFilterChange("rating", rating.toString())}
                  className="w-4 h-4 text-[#B39E7A] border-gray-300 rounded focus:ring-[#B39E7A]"
                />
                <span className={`text-gray-700 flex items-center ${isArabic ? 'mr-3' : 'ml-3'}`}>
                  {rating}
                  <svg className={`w-3 h-3 text-yellow-400 fill-current ${isArabic ? 'mr-1' : 'ml-1'}`} viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  & up
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        {filterOptions.sizes.length > 0 && (
          <FilterSection
            title={t('shop.size')}
            items={filterOptions.sizes}
            filterKey="sizes"
            isOpen={showSizeDropdown}
            setIsOpen={setShowSizeDropdown}
            filters={filters}
            handleArrayFilterChange={handleArrayFilterChange}
          />
        )}

        {/* Color Filter */}
        {filterOptions.colors.length > 0 && (
          <FilterSection
            title={t('shop.color')}
            items={filterOptions.colors}
            filterKey="colors"
            isOpen={showColorDropdown}
            setIsOpen={setShowColorDropdown}
            filters={filters}
            handleArrayFilterChange={handleArrayFilterChange}
          />
        )}

        {/* Availability Filter */}
        <FilterSection
          title={t('shop.availability')}
          items={filterOptions.availability}
          filterKey="availability"
          isOpen={showAvailabilityDropdown}
          setIsOpen={setShowAvailabilityDropdown}
          renderItem={(item) => availabilityLabels[item as keyof typeof availabilityLabels] || item}
          filters={filters}
          handleArrayFilterChange={handleArrayFilterChange}
        />

        {/* Material Filter */}
        {filterOptions.materials.length > 0 && (
          <FilterSection
            title={t('shop.material')}
            items={filterOptions.materials}
            filterKey="material"
            isOpen={showMaterialDropdown}
            setIsOpen={setShowMaterialDropdown}
            filters={filters}
            handleArrayFilterChange={handleArrayFilterChange}
          />
        )}

        {/* Shop Filter */}
        {filterOptions.shops.length > 0 && (
          <FilterSection
            title={t('shop.shop')}
            items={filterOptions.shops}
            filterKey="shop"
            isOpen={showShopDropdown}
            setIsOpen={setShowShopDropdown}
            filters={filters}
            handleArrayFilterChange={handleArrayFilterChange}
          />
        )}

        {/* Exclusive Products Filter */}
        <div className="mb-8">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.exclusiveOnly}
              onChange={(e) => handleFilterChange("exclusiveOnly", e.target.checked)}
              className="w-4 h-4 text-[#B39E7A] border-gray-300 rounded focus:ring-[#B39E7A]"
            />
            <span className={`text-gray-700 font-medium ${isArabic ? 'mr-3' : 'ml-3'}`}>
              {t('shop.exclusiveOnly')}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  items: string[];
  filterKey: keyof Filters;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  renderItem?: (item: string) => React.ReactNode;
  filters: Filters;
  handleArrayFilterChange: ArrayFilterChangeHandler;
}

const FilterSection = ({ 
  title, 
  items, 
  filterKey, 
  isOpen, 
  setIsOpen, 
  renderItem,
  filters,
  handleArrayFilterChange
}: FilterSectionProps) => (
  <div className="mb-8">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex items-center font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider justify-between hover:text-gray-900 transition-colors"
    >
      <span>{title}</span>
      <div className="flex items-center gap-2">
        {(filters[filterKey] as string[]).length > 0 && (
          <span className="bg-[#B39E7A] text-white text-xs px-2 py-0.5 rounded-full">
            {(filters[filterKey] as string[]).length}
          </span>
        )}
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    {isOpen && (
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <label key={item} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={(filters[filterKey] as string[]).includes(item)}
              onChange={() => handleArrayFilterChange(filterKey, item)}
              className="w-4 h-4 text-[#B39E7A] border-gray-300 rounded focus:ring-[#B39E7A]"
            />
            <span className="ml-3 text-gray-700 capitalize">
              {renderItem ? renderItem(item) : item}
            </span>
          </label>
        ))}
      </div>
    )}
  </div>
);
