'use client';

import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { promoItems } from '../../data/homeData';
import { PromoCard } from './PromoCard';

const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';
const accentColor = '#C9A84C';

export default function PromoSection() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <section
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`relative py-12 sm:py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'
      }`}
    >
      {/* Background decorative */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 50%, ${accentColor} 0%, transparent 60%), radial-gradient(circle at 20% 20%, ${accentColor} 0%, transparent 50%)`,
        }}
      />
      <div
        className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none blur-3xl`}
        style={{ background: accentColor }}
      />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />
      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-14 lg:mb-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
            <div className="h-px w-8 sm:w-12" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] font-bold" style={{ color: accentColor }}>
              {String(t('home.promo.badge') || 'Why Choose Us')}
            </span>
            <div className="h-px w-8 sm:w-12" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
          </div>

          <h2 className={`text-2xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-4 sm:mb-5 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {String(t('home.promo.title'))}
          </h2>

          <div className="flex items-center gap-2">
            <div className="h-[2px] w-6 sm:w-8 rounded-full" style={{ background: 'rgba(201,168,76,0.3)' }} />
            <div className="h-[3px] w-12 sm:w-16 rounded-full" style={{ background: accentGradient }} />
            <div className="h-[2px] w-6 sm:w-8 rounded-full" style={{ background: 'rgba(201,168,76,0.3)' }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
          {promoItems.map((item, index) => (
            <PromoCard key={item.id} item={item} index={index} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
