"use client";

import Link from "next/link";
import { useTranslation } from '@/i18n';

export default function PageHeader() {
  const { t, isArabic } = useTranslation();
  
  return (
    <div className="py-6 sm:py-8 bg-[#EBEBE9]" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
          {t('shop.title')}
        </h1>
        <nav className="text-xs sm:text-sm text-gray-600">
          <Link href="/" className="transition-colors hover:text-gray-900">
            {t('shop.home')}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{t('shop.title')}</span>
        </nav>
      </div>
    </div>
  );
}
