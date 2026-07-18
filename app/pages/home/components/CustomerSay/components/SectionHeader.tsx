import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { Quote } from 'lucide-react';

const accentColor = '#C9A84C';
const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

interface SectionHeaderProps {
  isLoggedIn: boolean;
  onOpenForm: () => void;
}

export const SectionHeader = ({ isLoggedIn, onOpenForm }: SectionHeaderProps) => {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center mb-10 sm:mb-14">
      <div
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border rounded-full px-4 py-1.5 mb-5"
        style={{ borderColor: `${accentColor}40` }}
      >
        <Quote size={12} style={{ color: accentColor }} />
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accentColor }}>
          {isArabic ? 'آراء العملاء' : 'Customer Reviews'}
        </span>
      </div>

      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isArabic ? 'ماذا يقول العملاء' : 'What Customers Say'}
      </h2>

      <p className={`text-sm sm:text-base mb-6 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
        {isArabic ? 'اقرأ تجارب عملائنا الراضين' : 'Read what our satisfied customers have to say'}
      </p>

      <div
        className="h-[2px] w-16 mx-auto mb-7"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
      />

      {isLoggedIn ? (
        <button
          onClick={onOpenForm}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
          style={{ background: accentGradient }}
        >
          <Plus size={15} />
          {isArabic ? 'اترك تقييمك' : 'Leave Your Review'}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className={`text-sm ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
            {isArabic ? 'يجب تسجيل الدخول لترك تقييم' : 'Please log in to leave a review'}
          </p>
          <Link
            href="/pages/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
            style={{ background: accentGradient }}
          >
            {isArabic ? 'تسجيل الدخول' : 'Log In'}
          </Link>
        </div>
      )}
    </div>
  );
};
