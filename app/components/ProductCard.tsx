"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/category";
import { useTheme } from "@/context/ThemeContext";

interface ProductCardProps {
  product: Product;
  isArabic: boolean;
  t: (key: string) => string;
  addToCart: (product: Product) => void;
}

const ProductCard = memo(({ product, isArabic, t, addToCart }: ProductCardProps) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <Link href={`/pages/product/${product._id}`} className="group">
      <div className={`${isDarkMode ? 'bg-[#242830] border-gray-700' : 'bg-white border-transparent hover:border-amber-100'} rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border`}>
        <div className="aspect-3/4 relative overflow-hidden bg-gray-100">
          <Image 
            src={product.mainImage} 
            alt={isArabic ? (product.nameAr || product.name) : product.name} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.basePrice > product.finalPrice && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-rose-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              -{Math.round((1 - product.finalPrice / product.basePrice) * 100)}%
            </div>
          )}
        </div>
        <div className="p-4 sm:p-5">
          <h3 className={`font-light mb-2 line-clamp-2 text-base sm:text-lg group-hover:text-[#8B6914] transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {isArabic ? (product.nameAr || product.name) : product.name}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs sm:text-sm ${i < Math.floor(product.averageRating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.totalReviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-light text-[#8B6914]">{product.finalPrice}</span>
              <span className="text-xs sm:text-sm text-gray-400">{t('product.egp')}</span>
              {product.basePrice > product.finalPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">{product.basePrice}</span>
              )}
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button 
                onClick={(e) => { e.preventDefault(); router.push(`/pages/product/${product._id}`); }} 
                className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer bg-[#8B6914] rounded-full flex items-center justify-center hover:bg-[#6B5010] transition-all shadow-sm"
                aria-label="View product"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); addToCart(product); }} 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#8B6914] cursor-pointer rounded-full flex items-center justify-center hover:bg-[#6B5010] transition-all shadow-sm"
                aria-label="Add to cart"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
