"use client";

import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-6xl mb-4 opacity-20">✨</div>
        <p className="text-gray-400 font-light text-lg mb-4">No pieces match your selection</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-[#B39E7A] hover:text-[#A08D6A] font-medium transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
