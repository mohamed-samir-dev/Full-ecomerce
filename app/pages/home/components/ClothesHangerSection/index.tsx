'use client';

import { useTranslation } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { Crown } from 'lucide-react';

const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #D4AF37 50%, #f5e27a 100%)';
const accentColor = '#D4AF37';

export default function ClothesHangerSection() {
  const { t, isArabic } = useTranslation();

  return (
    <section className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] overflow-hidden">
      <Image
        src="/images/cloth.webp"
        alt="clothes background"
        fill
        className="object-cover object-center"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background: isArabic
            ? 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      <div className="relative z-10 h-full flex items-center w-full">
        <div
          dir={isArabic ? 'rtl' : 'ltr'}
          className={`flex flex-col px-5 sm:px-10 lg:px-20 max-w-xl ${
            isArabic ? 'mr-0 ml-auto' : 'ml-0 mr-auto'
          }`}
        >
        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 mb-3 w-fit">
          <Crown size={12} style={{ color: accentColor }} />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-white/90">
            {String(t('home.clothes.badge'))}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 lg:mb-4"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          <span
            style={{
              background: accentGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {String(t('home.clothes.title'))}
          </span>
        </h2>

        {/* Divider */}
        <div
          className="h-[2px] w-12 mb-3"
          style={{ background: `linear-gradient(to ${isArabic ? 'left' : 'right'}, ${accentColor}, transparent)` }}
        />

        <p className="text-xs sm:text-sm lg:text-base text-white/75 leading-relaxed mb-2 lg:mb-3 max-w-sm lg:max-w-md">
          {String(t('home.clothes.desc1'))}
        </p>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-5 lg:mb-8 max-w-sm lg:max-w-md">
          {String(t('home.clothes.desc2'))}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/pages/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-full font-bold text-xs lg:text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: accentGradient }}
          >
            {String(t('home.clothes.cta'))}
          </Link>
          <Link
            href="/pages/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-full font-semibold text-xs lg:text-sm border border-white/30 text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
          >
            {String(t('home.hero.explore'))}
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
