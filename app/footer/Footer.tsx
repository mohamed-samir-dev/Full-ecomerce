"use client";

import Link from 'next/link';
import { AboutUs, CustomerService, QuickLinks, SocialMedia } from "./sections";
import { useTranslation } from '@/i18n';
import { Crown } from 'lucide-react';

const accentColor = '#C9A84C';
const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

export function Footer() {
  const { t, isArabic } = useTranslation();

  return (
    <footer className="relative bg-[#0D0D0D] text-white overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>

      {/* Top gold accent line */}
      <div className="h-[2px] w-full" style={{ background: accentGradient }} />

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, ${accentColor} 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">

        {/* Logo row */}
        <div className="flex items-center gap-2.5 mb-10">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}50` }}
          >
            <Crown size={16} style={{ color: accentColor }} />
          </div>
          <span
            className="text-xl font-black tracking-tight"
            style={{
              background: accentGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Global Shop
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <AboutUs />
          <CustomerService />
          <QuickLinks />
          <SocialMedia />
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {t('footer.copyright').replace('{{year}}', new Date().getFullYear().toString())}
          </p>
          <div className="flex gap-6">
            <Link
              href="/pages/privacy-policy"
              className="text-xs text-white/30 hover:text-white/70 transition-colors"
            >
              {t('footer.legal.privacy')}
            </Link>
            <Link
              href="/pages/terms-of-service"
              className="text-xs text-white/30 hover:text-white/70 transition-colors"
            >
              {t('footer.legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
