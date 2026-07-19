import { TagIcon } from '@heroicons/react/24/outline';
import { PromoCodeProps } from '../../../types/cart';

export default function PromoCode({ isDarkMode, isArabic }: PromoCodeProps) {
  return (
    <div
      className={`p-3 rounded-xl border ${
        isDarkMode ? 'border-white/5 bg-white/3' : 'border-gray-100 bg-gray-50'
      }`}
    >
      <div className={`flex items-center gap-1.5 mb-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <TagIcon className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
        <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {isArabic ? 'كود الخصم' : 'Promo Code'}
        </span>
      </div>
      <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <input
          type="text"
          placeholder={isArabic ? 'أدخل كود الخصم' : 'Enter promo code'}
          className={`flex-1 px-3 py-2 text-xs rounded-xl border outline-none transition-all focus:border-[#C9A84C] ${
            isArabic ? 'text-right' : 'text-left'
          } ${
            isDarkMode
              ? 'bg-[#191C21] border-white/10 text-white placeholder-gray-500'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
        <button
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          {isArabic ? 'تطبيق' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
