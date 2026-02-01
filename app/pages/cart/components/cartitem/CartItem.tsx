'use client';

import { TrashIcon, MinusIcon, PlusIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import {CartItemProps}from '../../types/cart'


export default function CartItem({ item, isDarkMode, isArabic, onRemove, onUpdateQuantity }: CartItemProps) {
  const price = Number(item.product.finalPrice || item.product.basePrice) || 0;
  const originalPrice = item.product.basePrice;
  const hasDiscount = originalPrice > price;

  return (
    <div className={`group p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-slate-200/50'
    }`}>
      <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
        <div className="relative w-full sm:w-20 md:w-24 lg:w-28 h-40 sm:h-20 md:h-24 lg:h-28 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={item.product.mainImage}
            alt={item.product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {hasDiscount && (
            <div className={`absolute top-1.5 sm:top-2 ${isArabic ? 'right-1.5 sm:right-2' : 'left-1.5 sm:left-2'} bg-linear-to-r from-red-500 to-red-600 text-white text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg font-semibold shadow-lg`}>
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </div>
          )}
          {item.product.stock < 10 && (
            <div className={`absolute bottom-1.5 sm:bottom-2 ${isArabic ? 'left-1.5 sm:left-2' : 'right-1.5 sm:right-2'} bg-orange-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium`}>
              {isArabic ? `${item.product.stock} متبقي` : `${item.product.stock} left`}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className={`flex justify-between items-start mb-2 gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1 min-w-0">
              <Link href={`/pages/product/${item.product._id}`} className="block group-hover:text-blue-600 transition-colors">
                <h3 className={`font-semibold text-sm sm:text-base md:text-lg line-clamp-2 mb-1.5 sm:mb-2 md:mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                } ${isArabic ? 'text-right' : 'text-left'}`}>
                  {isArabic && item.product.nameAr ? item.product.nameAr : item.product.name}
                </h3>
              </Link>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                <span className={`text-base sm:text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {isArabic ? `${price.toFixed(2)} ج.م` : `${price.toFixed(2)} EGP`}
                </span>
                {hasDiscount && (
                  <>
                    <span className={`text-xs sm:text-sm md:text-base line-through ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isArabic ? `${originalPrice.toFixed(2)} ج.م` : `${originalPrice.toFixed(2)} EGP`}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {isArabic ? `وفر ${(originalPrice - price).toFixed(2)} ج.م` : `Save ${(originalPrice - price).toFixed(2)} EGP`}
                    </span>
                  </>
                )}
              </div>
              <div className={`flex items-center gap-1.5 sm:gap-2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{isArabic ? 'ضمان الجودة' : 'Quality Guaranteed'}</span>
              </div>
            </div>
            
            <div className={`flex gap-1.5 sm:gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <button
                className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-pink-400 hover:bg-pink-900/20'
                    : 'text-slate-400 hover:text-pink-500 hover:bg-pink-50'
                }`}
                title={isArabic ? 'إضافة للمفضلة' : 'Add to Wishlist'}
              >
                <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => onRemove(item.product._id)}
                className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/20'
                    : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                }`}
                title={isArabic ? 'حذف من السلة' : 'Remove from Cart'}
              >
                <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 md:pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          } ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {isArabic ? 'الكمية' : 'Qty'}
              </span>
              <div className={`flex items-center border-2 rounded-lg sm:rounded-xl overflow-hidden ${
                isDarkMode ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-white'
              }`}>
                <button
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className={`p-1.5 sm:p-2 md:p-3 transition-all disabled:opacity-50 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <div className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-center min-w-8 sm:min-w-10 md:min-w-14 font-bold text-sm sm:text-base md:text-lg border-x ${
                  isDarkMode ? 'text-white border-slate-600' : 'text-slate-900 border-slate-300'
                }`}>
                  {item.quantity}
                </div>
                <button
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  className={`p-1.5 sm:p-2 md:p-3 transition-all disabled:opacity-50 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
            
            <div className={`text-right ${isArabic ? 'text-left' : 'text-right'}`}>
              <div className={`text-lg sm:text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isArabic ? `${(price * item.quantity).toFixed(2)} ج.م` : `${(price * item.quantity).toFixed(2)} EGP`}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isArabic ? `${price.toFixed(2)} ج.م للواحد` : `${price.toFixed(2)} EGP each`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
