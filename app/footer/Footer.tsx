"use client";

import { useState } from 'react';
import { AboutUs, CustomerService, QuickLinks, SocialMedia } from "./sections";
import { useTranslation } from '@/i18n';
import { DemoSiteModal } from '@/app/components/DemoSiteModal';

export function Footer() {
  const { t, isArabic } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="bg-gray-900 text-white transition-colors duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <AboutUs />
          <CustomerService />
          <QuickLinks />
          <SocialMedia />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {t('footer.copyright').replace('{{year}}', new Date().getFullYear().toString())}
            </p>
            <div className="flex gap-6">
              <button onClick={() => setShowModal(true)} className="text-sm transition-colors hover:text-[#C7AB6C] text-gray-400">
                {t('footer.legal.privacy')}
              </button>
              <button onClick={() => setShowModal(true)} className="text-sm transition-colors hover:text-[#C7AB6C] text-gray-400">
                {t('footer.legal.terms')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <DemoSiteModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </footer>
  );
}
