"use client";

import { useState } from 'react';
import { socialLinks } from "../constants";
import { useTranslation } from '@/i18n';
import { DemoSiteModal } from '@/app/components/DemoSiteModal';

export function SocialMedia() {
  const { t, isArabic } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-4 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.socialMedia.title')}
      </h3>
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <button
            key={index}
            onClick={() => setShowModal(true)}
            aria-label={social.label}
            className="p-2 rounded-full transition-all hover:scale-110 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer"
          >
            <social.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
      <DemoSiteModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <p className={`text-sm text-gray-400 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.socialMedia.followUs')}
      </p>
    </div>
  );
}
