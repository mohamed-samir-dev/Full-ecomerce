'use client';

import { ArrowLeftIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { CartHeaderProps } from '../../types/cart';

export default function CartHeader({ isDarkMode, isArabic, itemCount, total, subtotal }: CartHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <Link
        href="/pages/shop"
        className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors group ${
          isDarkMode ? 'text-gray-400 hover:text-[#C9A84C]' : 'text-gray-500 hover:text-[#C9A84C]'
        } ${isArabic ? 'flex-row-reverse' : ''}`}
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {isArabic ? 'العودة للتسوق' : 'Continue Shopping'}
      </Link>

      <div className="flex items-end justify-between">
        <div>
          <div className={`flex items-center gap-3 mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
            >
              <ShoppingCartIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'سلة التسوق' : 'Shopping Cart'}
            </h1>
          </div>
          <p className={`text-sm mt-2 ${isArabic ? 'text-right' : ''} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {itemCount > 0
              ? isArabic
                ? `${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'} • ${total.toFixed(2)} EGP إجمالي`
                : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} • ${total.toFixed(2)} EGP total`
              : '\u00A0'}
          </p>
        </div>

        {itemCount > 0 && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              subtotal >= 100
                ? 'text-white'
                : isDarkMode ? 'text-gray-300 bg-white/5' : 'text-gray-600 bg-gray-100'
            } ${isArabic ? 'flex-row-reverse' : ''}`}
            style={subtotal >= 100 ? { background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' } : {}}
          >
            <TruckIcon className="h-4 w-4" />
            <span>
              {subtotal >= 100
                ? isArabic ? 'شحن مجاني' : 'Free Shipping'
                : isArabic ? `متبقي ${(100 - subtotal).toFixed(2)} EGP` : `${(100 - subtotal).toFixed(2)} EGP away`}
            </span>
          </div>
        )}
      </div>

      <div
        className="mt-6 h-px w-full"
        style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }}
      />
    </div>
  );
}
