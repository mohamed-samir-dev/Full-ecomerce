"use client";

import Link from 'next/link';
import { quickLinksData } from "../constants";
import { useTranslation } from '@/i18n';

export function QuickLinks() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-4 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.quickLinks.title')}
      </h3>
      <ul className="space-y-3">
        {quickLinksData.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={`text-sm transition-colors hover:text-[#C7AB6C] text-gray-400 block ${isArabic ? 'text-right' : ''}`}
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
