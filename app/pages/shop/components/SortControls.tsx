"use client";

import { Filters, FilterChangeHandler } from "../types";
import SearchBar from "./SearchBar";

interface SortControlsProps {
  filters: Filters;
  handleFilterChange: FilterChangeHandler;
  totalProducts?: number;
}

export default function SortControls({ filters, handleFilterChange, totalProducts }: SortControlsProps) {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
    { value: "name", label: "Name A-Z" },
  ];

  const getResultsText = () => {
    if (totalProducts === undefined) return "Loading...";
    if (totalProducts === 0) return "No products found";
    
    const hasFilters = 
      filters.category.length > 0 ||
      filters.brand.length > 0 ||
      filters.sizes.length > 0 ||
      filters.colors.length > 0 ||
      filters.availability.length > 0 ||
      filters.material.length > 0 ||
      filters.shop.length > 0 ||
      filters.rating.length > 0 ||
      filters.exclusiveOnly ||
      filters.search.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 1000;
    
    return `${totalProducts} product${totalProducts !== 1 ? 's' : ''} ${hasFilters ? 'found' : 'available'}`;
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <SearchBar filters={filters} handleFilterChange={handleFilterChange} />
      
      {/* Results and Sort Controls */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600 font-medium">
          {getResultsText()}
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs sm:text-sm font-medium whitespace-nowrap text-gray-700">
            Sort by
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border accent-[#C1B092] rounded-md flex-1 sm:flex-none min-w-0 bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B39E7A] focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(filters.category.length > 0 || 
        filters.brand.length > 0 || 
        filters.sizes.length > 0 || 
        filters.colors.length > 0 || 
        filters.availability.length > 0 || 
        filters.material.length > 0 || 
        filters.shop.length > 0 || 
        filters.rating.length > 0 || 
        filters.exclusiveOnly || 
        filters.search.length > 0) && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Active filters:</span>
          
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#B39E7A] text-white text-xs rounded-full">
              Search: "{filters.search}"
              <button
                onClick={() => handleFilterChange("search", "")}
                className="hover:bg-[#A08B6F] rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          
          {filters.category.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {cat}
              <button
                onClick={() => handleFilterChange("category", filters.category.filter(c => c !== cat))}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          
          {filters.brand.map(brand => (
            <span key={brand} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {brand}
              <button
                onClick={() => handleFilterChange("brand", filters.brand.filter(b => b !== brand))}
                className="hover:bg-green-200 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          
          {filters.exclusiveOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Exclusive Only
              <button
                onClick={() => handleFilterChange("exclusiveOnly", false)}
                className="hover:bg-purple-200 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
