'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, Gem, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';
const accentColor = '#C9A84C';

export default function LuxuryPromoSection() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const features = [
    { icon: <Crown size={18} />, label: t('home.luxuryPromo.feature1'), desc: t('home.luxuryPromo.feature1Desc') },
    { icon: <Gem size={18} />, label: t('home.luxuryPromo.feature2'), desc: t('home.luxuryPromo.feature2Desc') },
    { icon: <Sparkles size={18} />, label: t('home.luxuryPromo.feature3'), desc: t('home.luxuryPromo.feature3Desc') },
  ];

  return (
    <section
      className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor} 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${accentColor} 0%, transparent 50%)`,
        }}
      />
      <div
        className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none blur-3xl`}
        style={{ background: accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-7 order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5"
              style={{ borderColor: `${accentColor}40` }}>
              <Crown size={12} style={{ color: accentColor }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accentColor }}>
                {t('home.luxuryPromo.badge')}
              </span>
            </div>

            {/* Heading */}
            <div>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
                style={{ textShadow: isDarkMode ? '0 2px 20px rgba(0,0,0,0.4)' : 'none' }}
              >
                {t('home.luxuryPromo.title1')}{' '}
                <span
                  className="block font-serif italic"
                  style={{
                    background: accentGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('home.luxuryPromo.title2')}
                </span>
              </h2>
              {/* Gold divider */}
              <div
                className={`h-[2px] w-16 mt-4 ${isArabic ? 'mr-0' : 'ml-0'}`}
                style={{ background: `linear-gradient(to ${isArabic ? 'left' : 'right'}, ${accentColor}, transparent)` }}
              />
            </div>

            {/* Description */}
            <p className={`text-sm sm:text-base lg:text-lg leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              {t('home.luxuryPromo.description')}
            </p>

            {/* Feature pills */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 rounded-2xl px-3 sm:px-4 py-2.5 border transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-white/60 border-white hover:bg-white/90'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {f.label}
                    </div>
                    <div className={`text-[11px] leading-tight mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 pt-2">
              <Link
                href="/pages/banner-pages/premium"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
                style={{ background: accentGradient }}
              >
                {t('home.luxuryPromo.button')}
                <ArrowIcon size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/pages/shop"
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isDarkMode
                    ? 'border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'
                    : 'border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400'
                }`}
              >
                {t('home.luxuryPromo.secondaryButton')}
              </Link>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative h-[300px] xs:h-[360px] sm:h-[460px] lg:h-[600px] grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2"
          >
            {/* Gold accent line */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-8 opacity-40"
              style={{ background: accentGradient }}
            />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/EXCLUSIVE-1.avif"
                alt="Luxury fashion"
                fill
                loading="lazy"
                quality={70}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl mt-8 sm:mt-12 lg:mt-16">
              <Image
                src="/images/EXCLUSIVE-2.avif"
                alt="Premium clothing"
                fill
                loading="lazy"
                quality={70}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Floating badge on second image */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-white text-[11px] font-bold tracking-wider whitespace-nowrap"
                style={{ background: 'rgba(0,0,0,0.5)', borderColor: `${accentColor}60` }}
              >
                <Sparkles size={10} style={{ color: accentColor }} />
                NEW SEASON
              </div>
            </div>

            {/* Decorative gold corner */}
            <div
              className={`absolute -bottom-3 ${isArabic ? '-left-3' : '-right-3'} w-16 h-16 rounded-full opacity-20 blur-xl`}
              style={{ background: accentColor }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
