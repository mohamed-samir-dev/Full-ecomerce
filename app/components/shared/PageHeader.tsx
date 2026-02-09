import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

interface PageHeaderProps {
  title: string;
  titleAr: string;
  bgColor?: string;
  iconColor?: string;
}

export default function PageHeader({ title, titleAr, bgColor = '#EBEBE9', iconColor = '#B39E7A' }: PageHeaderProps) {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <div className="py-6 sm:py-8" style={{ backgroundColor: isDarkMode ? '#23272F' : bgColor }} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6" style={{ color: iconColor }} />
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {isArabic ? titleAr : title}
          </h1>
        </div>
        <nav className={`text-xs sm:text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <Link href="/" className={`transition-colors ${
            isDarkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'
          }`}>
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{isArabic ? titleAr : title}</span>
        </nav>
      </div>
    </div>
  );
}
