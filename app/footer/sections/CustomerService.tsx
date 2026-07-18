"use client";

import { useState } from 'react';
import { customerServices } from "../constants";
import { useTranslation } from '@/i18n';
import { DemoSiteModal } from '@/app/components/DemoSiteModal';

const accentColor = '#C9A84C';

export function CustomerService() {
  const { t, isArabic } = useTranslation();
  const [showModal, setShowModal] = useState(false);

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
            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors ${
                isArabic ? 'flex-row-reverse justify-end' : ''
              }`}
            >
              {service.icon && <service.icon className="h-3.5 w-3.5 flex-shrink-0" />}
              {t(service.labelKey)}
            </button>
          </li>
        ))}
      </ul>
      <DemoSiteModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
