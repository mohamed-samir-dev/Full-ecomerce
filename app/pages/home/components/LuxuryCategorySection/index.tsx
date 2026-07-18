'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { categories } from '../../data/homeData';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

const accentColor = '#C9A84C';
const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

export default function LuxuryCategorySection() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 80%, ${accentColor} 0%, transparent 55%), radial-gradient(circle at 90% 10%, ${accentColor} 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border rounded-full px-4 py-1.5 mb-5"
            style={{ borderColor: `${accentColor}40` }}
          >
            <Sparkles size={12} style={{ color: accentColor }} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accentColor }}>
              {t('home.category.badge') || 'Collections'}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('home.category.title')}
          </h2>
          <div
            className="h-[2px] w-16 mx-auto mt-5"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
          />
        </motion.div>

        {/* Featured large card + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

          {/* Large featured card — first category */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <Link href={categories[0].link} className="group block relative rounded-3xl overflow-hidden h-[260px] xs:h-[300px] sm:h-[380px] lg:h-full lg:min-h-[500px] shadow-2xl">
              <Image
                src={categories[0].image}
                alt={t(categories[0].nameKey)}
                fill
                loading="lazy"
                quality={70}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Gold shimmer overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: accentGradient }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <span
                  className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2"
                  style={{ color: accentColor }}
                >
                  {t('home.category.shopNow')}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {t(categories[0].nameKey)}
                </h3>
                <div
                  className="mt-4 inline-flex items-center gap-2 self-start px-5 py-2 rounded-full text-sm font-bold text-white border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                >
                  <span>{t('home.category.shopNow')}</span>
                  <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              {/* Gold corner accent */}
              <div
                className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} w-10 h-10 rounded-full flex items-center justify-center`}
                style={{ background: `${accentColor}25`, border: `1px solid ${accentColor}50` }}
              >
                <Sparkles size={14} style={{ color: accentColor }} />
              </div>
            </Link>
          </motion.div>

          {/* Right grid — remaining categories */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {categories.slice(1).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link href={category.link} className="group block relative rounded-2xl overflow-hidden shadow-lg h-[130px] xs:h-[150px] sm:h-[175px] lg:h-[155px] xl:h-[165px]">
                  <Image
                    src={category.image}
                    alt={t(category.nameKey)}
                    fill
                    loading="lazy"
                    quality={65}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-600 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ background: accentGradient }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                      {t(category.nameKey)}
                    </h3>
                    <div
                      className="mt-1 text-[10px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      style={{ color: accentColor }}
                    >
                      {t('home.category.shopNow')}
                    </div>
                  </div>
                  {/* thin gold bottom border on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: accentGradient }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
