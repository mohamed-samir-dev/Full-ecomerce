'use client';

import { ArrowLeftIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {CartHeaderProps}from '../../types/cart'


export default function CartHeader({ isDarkMode, isArabic, itemCount, total, subtotal }: CartHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6 md:mb-8">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
        <Link href="/pages/shop" className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-colors ${
          isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}>
          <ArrowLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          {isArabic ? 'العودة للتسوق' : 'Continue Shopping'}
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className={isArabic ? 'w-full sm:w-auto flex flex-col items-end' : ''}>
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 md:mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          } ${isArabic ? 'text-right w-full' : 'text-left'}`}>
            {isArabic ? 'سلة التسوق' : 'Shopping Cart'}
          </h1>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${
            isArabic ? 'text-right w-full' : 'text-left'
          }`}>
            {itemCount > 0 ? (
              isArabic 
                ? `${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'} • $${total.toFixed(2)} الإجمالي`
                : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} • $${total.toFixed(2)} total`
            ) : '\u00A0'}
          </p>
        </div>
        {itemCount > 0 && (
          <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
          }`}>
            <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">
              {subtotal >= 100 
                ? (isArabic ? 'شحن مجاني' : 'Free Shipping') 
                : (isArabic ? `متبقي $${(100 - subtotal).toFixed(2)}` : `$${(100 - subtotal).toFixed(2)} away`)
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
