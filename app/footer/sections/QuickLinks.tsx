"use client";

import { useState } from 'react';
import { quickLinksData } from "../constants";
import { useTranslation } from '@/i18n';
import { DemoSiteModal } from '@/app/components/DemoSiteModal';

export function QuickLinks() {
  const { t, isArabic } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-4 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.quickLinks.title')}
      </h3>
      <ul className="space-y-3">
        {quickLinksData.map((link, index) => (
          <li key={index}>
            <button
              onClick={() => setShowModal(true)}
              className={`text-sm transition-colors hover:text-[#C7AB6C] text-gray-400 block cursor-pointer text-left w-full ${isArabic ? 'text-right' : ''}`}
            >
              {t(link.labelKey)}
            </button>
          </li>
        ))}
      </ul>
      <DemoSiteModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
