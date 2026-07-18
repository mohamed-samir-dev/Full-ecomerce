"use client";

import Link from 'next/link';
import { quickLinksData } from "../constants";
import { useTranslation } from '@/i18n';

const accentColor = '#C9A84C';

export function QuickLinks() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3
        className="text-sm font-bold tracking-[0.15em] uppercase"
        style={{ color: accentColor }}
      >
        {t('footer.quickLinks.title')}
      </h3>
      <ul className="space-y-2.5">
        {quickLinksData.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={`text-sm text-white/50 hover:text-white/90 transition-colors block ${
                isArabic ? 'text-right' : ''
              }`}
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
