"use client";

import { useTranslation } from '@/i18n';

const accentColor = '#C9A84C';

export function AboutUs() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3
        className="text-sm font-bold tracking-[0.15em] uppercase"
        style={{ color: accentColor }}
      >
        {t('footer.aboutUs.title')}
      </h3>
      <p className={`text-sm leading-relaxed text-white/50 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.aboutUs.description')}
      </p>
    </div>
  );
}
