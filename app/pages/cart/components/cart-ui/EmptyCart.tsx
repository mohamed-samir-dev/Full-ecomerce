'use client';

import { ShoppingCartIcon, TagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EmptyCartProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function EmptyCart({ isDarkMode, isArabic }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-28">
      {/* Icon */}
      <div className="relative mb-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: isDarkMode ? '#C9A84C15' : '#C9A84C10' }}
        >
          <ShoppingCartIcon className="h-12 w-12" style={{ color: '#C9A84C' }} />
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 text-white text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)',
            borderColor: isDarkMode ? '#191C21' : '#f9fafb',
          }}
        >
          0
        </div>
      </div>

      <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {isArabic ? 'سلة التسوق فارغة' : 'Your cart is empty'}
      </h2>
      <p className={`text-sm sm:text-base mb-8 text-center max-w-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {isArabic
          ? 'ابدأ التسوق واكتشف منتجاتنا الرائعة!'
          : 'Discover amazing products and enjoy a seamless shopping experience!'}
      </p>

      <div className={`flex flex-col sm:flex-row gap-3 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
        <Link
          href="/pages/shop"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <ShoppingCartIcon className="h-4 w-4" />
          {isArabic ? 'ابدأ التسوق' : 'Start Shopping'}
        </Link>
        <Link
          href="/categories"
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 hover:border-[#C9A84C] hover:text-[#C9A84C] active:scale-95 ${
            isDarkMode ? 'border-white/10 text-gray-300' : 'border-gray-200 text-gray-600'
          }`}
        >
          <TagIcon className="h-4 w-4" />
          {isArabic ? 'تصفح الفئات' : 'Browse Categories'}
        </Link>
      </div>
    </div>
  );
}
