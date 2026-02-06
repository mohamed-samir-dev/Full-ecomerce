"use client";

import { Product } from "../types";
import { useTranslation } from '@/i18n';
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { isArabic } = useTranslation();
  
  if (products.length === 0) {
    return (
      <div className="text-center py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-6xl mb-4 opacity-20">✨</div>
        <p className="text-gray-400 font-light text-lg mb-4">{isArabic ? 'لا توجد منتجات تطابق اختيارك' : 'No pieces match your selection'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-[#B39E7A] hover:text-[#A08D6A] font-medium transition-colors"
        >
          {isArabic ? 'مسح جميع الفلاتر' : 'Clear all filters'}
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
