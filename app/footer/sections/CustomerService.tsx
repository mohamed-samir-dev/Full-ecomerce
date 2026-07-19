"use client";

import Link from 'next/link';
import { customerServices } from "../constants";
import { useTranslation } from '@/i18n';

const accentColor = '#C9A84C';

export function CustomerService() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3
        className="text-sm font-bold tracking-[0.15em] uppercase"
        style={{ color: accentColor }}
      >
        {t('footer.customerService.title')}
      </h3>
      <ul className="space-y-2.5">
        {customerServices.map((service, index) => (
          <li key={index}>
            <Link
              href={service.href}
              className={`flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors ${
                isArabic ? 'flex-row-reverse justify-end' : ''
              }`}
            >
              {service.icon && <service.icon className="h-3.5 w-3.5 flex-shrink-0" />}
              {t(service.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
