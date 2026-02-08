import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n';

interface PageHeaderProps {
  title: string;
  titleAr: string;
  bgColor?: string;
  iconColor?: string;
}

export default function PageHeader({ title, titleAr, bgColor = '#EBEBE9', iconColor = '#B39E7A' }: PageHeaderProps) {
  const { isArabic } = useTranslation();
  
  return (
    <div className="py-6 sm:py-8" style={{ backgroundColor: bgColor }} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6" style={{ color: iconColor }} />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {isArabic ? titleAr : title}
          </h1>
        </div>
        <nav className="text-xs sm:text-sm text-gray-600">
          <Link href="/" className="transition-colors hover:text-gray-900">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{isArabic ? titleAr : title}</span>
        </nav>
      </div>
    </div>
  );
}
