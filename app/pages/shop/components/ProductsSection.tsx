"use client";

import { useState, useMemo } from "react";
import { Filters } from "../types";
import { useProducts } from "../hooks/useProducts";
import { useTheme } from '@/context/ThemeContext';
import ProductGrid from "./ProductGrid";
import SortControls from "./SortControls";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

interface ProductsSectionProps {
  filters: Filters;
  handleFilterChange: (key: keyof Filters, value: Filters[keyof Filters]) => void;
}

export default function ProductsSection({ filters, handleFilterChange }: ProductsSectionProps) {
  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevFiltersKey, setPrevFiltersKey] = useState(filtersKey);
  
  if (prevFiltersKey !== filtersKey) {
    setPrevFiltersKey(filtersKey);
    setCurrentPage(1);
  }
  
  const { products, loading, error, totalProducts, totalPages } = useProducts(filters, currentPage);
  const { isDarkMode } = useTheme();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Search and Sort Controls Skeleton */}
        <div className="space-y-4">
          <div className={`h-12 rounded-lg animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className="flex justify-between items-center">
            <div className={`h-4 rounded w-32 animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-8 rounded w-40 animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-3xl overflow-hidden animate-pulse border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}
            >
              <div className={`aspect-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className="p-5">
                <div className={`h-4 rounded mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-3 rounded mb-3 w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-4 rounded mb-4 w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className="flex justify-between items-center">
                  <div className={`h-6 rounded w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div className="flex gap-2">
                    <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="mb-4">
          <svg className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-500 font-medium">{error}</p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please try again or contact support if the problem persists.</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#B39E7A] text-white rounded-md hover:bg-[#A08B6F] transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBar handleFilterChange={handleFilterChange} />
      <SortControls 
        filters={filters} 
        handleFilterChange={handleFilterChange} 
        totalProducts={totalProducts}
      />
      <ProductGrid products={products} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
      />
    </div>
  );
}
