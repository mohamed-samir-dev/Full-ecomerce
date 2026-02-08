'use client';

import Image from 'next/image';
import { useTranslation } from '@/i18n';
import Link from 'next/link'; 

export default function LuxuryPromoSection() {
  const { t, isArabic } = useTranslation();

  return (
    <section className="relative bg-linear-to-br from-[#E8E3DC] via-[#D4CFC8] to-[#B8B3AC] py-8 sm:py-12 lg:py-16" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block px-3 sm:px-4 py-1 bg-white/40 backdrop-blur-sm rounded-full">
              <span className="text-xs sm:text-sm font-medium text-gray-700 tracking-wider">{t('home.luxuryPromo.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 leading-tight">
              {t('home.luxuryPromo.title1')} <span className="block font-serif italic">{t('home.luxuryPromo.title2')}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md">
              {t('home.luxuryPromo.description')}
            </p>
            <Link href="/pages/banner-pages/premium" passHref>
            <button className="group px-6 sm:px-8 py-3 cursor-pointer sm:py-4 bg-gray-900 text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition flex items-center gap-2">
              {t('home.luxuryPromo.button')}
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:${isArabic ? '-translate-x-1' : 'translate-x-1'} transition-transform`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            </Link>
          </div>
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative rounded-lg overflow-hidden shadow-2xl transition">
              <Image src="/images/EXCLUSIVE-1.avif" alt="Luxury fashion model" fill className="object-cover" />
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-2xl transition mt-8 sm:mt-12">
              <Image src="/images/EXCLUSIVE-2.avif" alt="Premium clothing" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
