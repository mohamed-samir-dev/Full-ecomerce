"use client";

import { Product } from "../types";
import ProductCard from "./ProductCard";
import { ShoppingCart } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-8">
          <ShoppingCart className="w-20 h-20 text-gray-400" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
        <p className="text-gray-500 max-w-lg leading-relaxed text-lg mb-8">
          We couldn&apos;t find any products matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
