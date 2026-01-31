'use client';

import Image from 'next/image';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {FeaturedProductCardProps} from '../../types/home.types'


export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isDarkMode ? 'bg-[#1F2329]' : 'bg-white border border-gray-200'
    }`}>
      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 flex gap-1 sm:gap-2">
        <button onClick={(e) => {
          e.stopPropagation();
          window.location.href = `/pages/product/${product._id}`;
        }} className={`p-1 sm:p-1.5 rounded-full transition-colors ${
          isDarkMode ? 'bg-[#191C21] hover:bg-[#252930]' : 'bg-white hover:bg-gray-100'
        } shadow-md`}>
          <Eye className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <button className={`p-1 sm:p-1.5 rounded-full transition-colors ${
          isDarkMode ? 'bg-[#191C21] hover:bg-[#252930]' : 'bg-white hover:bg-gray-100'
        } shadow-md`}>
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
      </div>

      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>

      <div className="p-2 sm:p-3 md:p-4">
        <h3 className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.name}
        </h3>
        <p className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.finalPrice} EGP
        </p>
        <button className="w-full bg-[#B39E7A] hover:bg-[#A08B6F] text-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Add to Cart</span>
          <span className="xs:hidden">Add</span>
        </button>
      </div>
    </div>
  );
}
