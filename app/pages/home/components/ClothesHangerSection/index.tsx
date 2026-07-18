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
    <section className="relative overflow-hidden min-h-[320px] sm:min-h-[520px] lg:min-h-[620px]">
      <Image
        src="/images/cloth.webp"
        alt="clothes background"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        quality={90}
      />
      <div
        className="absolute inset-0"
        style={{
          background: isArabic
            ? 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      <div className="relative z-20 flex items-center min-h-[320px] sm:min-h-[520px] lg:min-h-[620px]">
        <div
          dir={isArabic ? 'rtl' : 'ltr'}
          className={`w-full max-w-3xl px-4 sm:px-10 lg:px-20 py-8 sm:py-0 flex flex-col items-start text-start ${
            isArabic ? 'ml-auto mr-0' : 'mr-auto ml-0'
          }`}
        >
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <Crown size={12} style={{ color: accentColor }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/90">
              {String(t('home.clothes.badge'))}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 leading-[1.05] tracking-tight text-white"
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
            className="h-[2px] w-16 mb-4 self-start"
            style={{ background: `linear-gradient(to ${isArabic ? 'left' : 'right'}, ${accentColor}, transparent)` }}
          />

          <p className="text-xs sm:text-base lg:text-lg mb-3 sm:mb-4 leading-relaxed text-white/75 max-w-xl">
            {String(t('home.clothes.desc1'))}
          </p>
          <p className="hidden sm:block text-sm text-white/60 leading-relaxed mb-5 sm:mb-7 max-w-xl">
            {String(t('home.clothes.desc2'))}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/pages/shop"
              className="inline-flex items-center gap-2 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
              style={{ background: accentGradient }}
            >
              {String(t('home.clothes.cta'))}
            </Link>
            <Link
              href="/pages/shop"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm border border-white/30 text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
            >
              {String(t('home.hero.explore'))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
