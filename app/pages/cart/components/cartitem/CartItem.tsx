'use client';

import { TrashIcon, MinusIcon, PlusIcon, HeartIcon, ShieldCheckIcon, TagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { CartItemProps } from '../../types/cart';

export default function CartItem({ item, isDarkMode, isArabic, onRemove, onUpdateQuantity }: CartItemProps) {
  const price = Number(item.product.finalPrice || item.product.basePrice) || 0;
  const originalPrice = item.product.basePrice;
  const hasDiscount = originalPrice > price;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const displayName = isArabic && item.product.nameAr ? item.product.nameAr : item.product.name;

  return (
    <div
      className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
        isDarkMode
          ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/30'
          : 'bg-white border-black/5 hover:border-[#C9A84C]/30'
      }`}
    >
      <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
        {/* Image */}
        <div className="relative w-full sm:w-28 h-44 sm:h-28 rounded-xl overflow-hidden shrink-0">
          <Image
            src={item.product.mainImage}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          {hasDiscount && (
            <div
              className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white`}
              style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
            >
              <TagIcon className="h-3 w-3" />
              -{discountPercent}%
            </div>
          )}
          {item.product.stock < 10 && (
            <div className={`absolute bottom-2 ${isArabic ? 'left-2' : 'right-2'} bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
              {isArabic ? `${item.product.stock} متبقي` : `${item.product.stock} left`}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className={`flex justify-between items-start gap-2 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Link href={`/pages/product/${item.product._id}`} className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-sm sm:text-base line-clamp-2 transition-colors hover:text-[#C9A84C] ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } ${isArabic ? 'text-right' : ''}`}
              >
                {displayName}
              </h3>
            </Link>

            <div className={`flex gap-1.5 shrink-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <button
                aria-label={isArabic ? 'إضافة للمفضلة' : 'Add to Wishlist'}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode ? 'text-gray-500 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10' : 'text-gray-400 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10'
                }`}
              >
                <HeartIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemove(item.product._id)}
                aria-label={isArabic ? 'حذف من السلة' : 'Remove from Cart'}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className={`flex flex-wrap items-baseline gap-2 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg font-bold" style={{ color: '#C9A84C' }}>
              {price.toFixed(2)}
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isArabic ? 'ج.م' : 'EGP'}
            </span>
            {hasDiscount && (
              <>
                <span className={`text-sm line-through ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {isArabic ? `وفر ${(originalPrice - price).toFixed(2)} ج.م` : `Save ${(originalPrice - price).toFixed(2)} EGP`}
                </span>
              </>
            )}
          </div>

          <div className={`flex items-center gap-1.5 text-xs mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${isArabic ? 'flex-row-reverse' : ''}`}>
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            <span>{isArabic ? 'ضمان الجودة' : 'Quality Guaranteed'}</span>
          </div>

          {/* Divider */}
          <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, #C9A84C20, transparent)' }} />

          {/* Quantity + Total */}
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {isArabic ? 'الكمية' : 'Qty'}
              </span>
              <div
                className={`flex items-center rounded-xl overflow-hidden border ${
                  isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <button
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="decrease"
                  className={`p-2 transition-all disabled:opacity-30 hover:text-[#C9A84C] ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <MinusIcon className="w-3.5 h-3.5" />
                </button>
                <span
                  className={`px-4 py-2 text-sm font-bold border-x min-w-[2.5rem] text-center ${
                    isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'
                  }`}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  aria-label="increase"
                  className={`p-2 transition-all disabled:opacity-30 hover:text-[#C9A84C] ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className={isArabic ? 'text-left' : 'text-right'}>
              <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {(price * item.quantity).toFixed(2)}
                <span className={`text-xs font-normal ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isArabic ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {isArabic ? `${price.toFixed(2)} ج.م للواحد` : `${price.toFixed(2)} EGP each`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
