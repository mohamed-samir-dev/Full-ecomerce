"use client";

import { Filters } from "../types";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "./ProductGrid";

interface ProductsSectionProps {
  filters: Filters;
}

export default function ProductsSection({ filters }: ProductsSectionProps) {
  const { products, loading, error } = useProducts(filters);

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#B39E7A] text-white rounded-md hover:bg-[#A08B6F] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
