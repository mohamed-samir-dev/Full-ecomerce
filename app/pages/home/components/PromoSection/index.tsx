'use client';

import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { promoItems } from '../../data/homeData';
import { PromoCard } from './PromoCard';

export default function PromoSection() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div className={`py-8 sm:py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#252525]' : 'bg-white'
    }`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:${isArabic ? 'text-right' : 'text-left'} ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {String(t('home.promo.title'))}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {promoItems.map((item) => (
            <PromoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
