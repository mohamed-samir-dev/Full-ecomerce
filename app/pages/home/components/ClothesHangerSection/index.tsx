'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import Image from 'next/image';

export default function ClothesHangerSection() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();

  return (
    <div className={`py-8 sm:py-12 lg:py-20 ${isDarkMode ? 'bg-[#1F2329]' : 'bg-[#F1F1F0]'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isArabic ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`relative flex justify-center lg:justify-start ${isArabic ? 'lg:order-2' : ''}`}>
            <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-20 ${
              isDarkMode ? 'bg-[#FF6B6B]' : 'bg-[#FF6B6B]'
            }`}></div>
            <Image 
              src="/images/ChatGPT_Image_Feb_2__2026__05_58_51_PM-removebg-preview.webp" 
              alt="clothes hanger" 
              width={384} 
              height={384} 
              className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md relative z-10" 
            />
          </div>
          <div className={`space-y-4 sm:space-y-6 text-center ${isArabic ? 'lg:text-right lg:order-1' : 'lg:text-left'}`}>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {String(t('home.clothes.title'))}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {String(t('home.clothes.desc1'))}
            </p>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {String(t('home.clothes.desc2'))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
