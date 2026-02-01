import { TagIcon } from '@heroicons/react/24/outline';
import {PromoCodeProps}from '../../../types/cart'


export default function PromoCode({ isDarkMode, isArabic }: PromoCodeProps) {
  return (
    <div className={`p-2.5 sm:p-3 md:p-4 rounded-lg border-2 border-dashed ${
      isDarkMode ? 'border-slate-600 bg-slate-700/30' : 'border-slate-300 bg-slate-50'
    }`}>
      <div className={`flex items-center gap-1.5 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
        <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {isArabic ? 'كود الخصم' : 'Promo Code'}
        </span>
      </div>
      <div className={`flex flex-col sm:flex-row gap-2 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
        <input
          type="text"
          placeholder={isArabic ? 'أدخل كود الخصم' : 'Enter promo code'}
          className={`flex-1 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border ${isArabic ? 'text-right' : 'text-left'} ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap">
          {isArabic ? 'تطبيق' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
