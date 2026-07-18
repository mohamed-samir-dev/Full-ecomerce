"use client";

import { useState } from 'react';
import { socialLinks } from "../constants";
import { useTranslation } from '@/i18n';
import { DemoSiteModal } from '@/app/components/DemoSiteModal';

const accentColor = '#C9A84C';

export function SocialMedia() {
  const { t, isArabic } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <h3
        className="text-sm font-bold tracking-[0.15em] uppercase"
        style={{ color: accentColor }}
      >
        {t('footer.socialMedia.title')}
      </h3>
      <p className={`text-sm text-white/50 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.socialMedia.followUs')}
      </p>
      <div className="flex gap-3">
        {socialLinks.map((social, index) => (
          <button
            key={index}
            onClick={() => setShowModal(true)}
            aria-label={social.label}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${accentColor}30`,
              color: 'rgba(255,255,255,0.5)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor;
              (e.currentTarget as HTMLButtonElement).style.color = accentColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${accentColor}30`;
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            <social.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <DemoSiteModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
