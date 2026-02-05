"use client";

import { socialLinks } from "../constants";
import { useTranslation } from '@/i18n';

export function SocialMedia() {
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold mb-4 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.socialMedia.title')}
      </h3>
      <div className={`flex gap-4 ${isArabic ? 'justify-end' : ''}`}>
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            className="p-2 rounded-full transition-all hover:scale-110 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
      <p className={`text-sm text-gray-400 ${isArabic ? 'text-right' : ''}`}>
        {t('footer.socialMedia.followUs')}
      </p>
    </div>
  );
}
