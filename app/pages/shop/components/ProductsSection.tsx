"use client";

import { Filters } from "../types";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "./ProductGrid";
import SortControls from "./SortControls";

interface ProductsSectionProps {
  filters: Filters;
  handleFilterChange: (key: keyof Filters, value: Filters[keyof Filters]) => void;
}

export default function ProductsSection({ filters, handleFilterChange }: ProductsSectionProps) {
  const { products, loading, error, totalProducts } = useProducts(filters);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Search and Sort Controls Skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg shadow-sm border overflow-hidden animate-pulse bg-white border-gray-200"
            >
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-3 sm:p-4">
                <div className="h-3 sm:h-4 rounded mb-2 bg-gray-200"></div>
                <div className="h-2 sm:h-3 rounded mb-3 w-3/4 bg-gray-200"></div>
                <div className="h-3 sm:h-4 rounded mb-4 w-1/2 bg-gray-200"></div>
                <div className="h-8 sm:h-10 rounded bg-gray-200"></div>
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
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Please try again or contact support if the problem persists.</p>
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
      <SortControls 
        filters={filters} 
        handleFilterChange={handleFilterChange} 
        totalProducts={totalProducts}
      />
      <ProductGrid products={products} />
    </div>
  );
}
