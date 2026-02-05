"use client";

import Link from "next/link";
import { customerServices } from "../constants";
import { useTranslation } from '@/i18n';

export function CustomerService() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.customerService.title')}
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {customerServices.map((service, index) => (
          <li key={index}>
            <Link 
              href={service.href}
              className={`flex items-center gap-2 text-xs sm:text-sm transition-colors hover:text-[#C7AB6C] text-gray-400 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}
            >
              {service.icon && <service.icon className="h-3 w-3 sm:h-4 sm:w-4" />}
              {t(service.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
