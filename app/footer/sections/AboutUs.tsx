"use client";

import { useTranslation } from '@/i18n';

export function AboutUs() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-4 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.aboutUs.title')}
      </h3>
      <p className={`text-sm leading-relaxed text-gray-400 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.aboutUs.description')}
      </p>
    </div>
  );
}
