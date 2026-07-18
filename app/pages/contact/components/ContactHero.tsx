'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { RiCustomerService2Line } from 'react-icons/ri';
import { HiArrowDown } from 'react-icons/hi';

export default function ContactHero() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative overflow-hidden ${isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Diagonal split background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, #1a1a1a 50%, #1F2329 50%)'
            : 'linear-gradient(135deg, #F5F0EA 50%, #EDE8E0 50%)',
        }}
      />

      {/* Gold accent blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border"
              style={{ borderColor: '#C9A84C40', background: '#C9A84C10' }}>
              <RiCustomerService2Line size={14} style={{ color: '#C9A84C' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
                {t('contact.hero.badge')}
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.hero.title')}{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('contact.hero.highlight')}
                <span
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C, transparent)' }}
                />
              </span>
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-lg ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
              {t('contact.hero.subtitle')}
            </p>

            {/* Scroll hint */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="flex items-center gap-2 w-fit"
              style={{ color: '#C9A84C' }}
            >
              <HiArrowDown size={18} />
              <span className="text-xs font-semibold tracking-wider uppercase opacity-70">Scroll</span>
            </motion.div>
          </motion.div>

          {/* Right: Decorative card stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-64 sm:h-80 hidden lg:block"
          >
            {/* Card 3 (back) */}
            <div
              className="absolute top-8 left-8 right-0 bottom-0 rounded-3xl rotate-6 opacity-30"
              style={{ background: isDarkMode ? '#1F2329' : '#fff', border: '1px solid #C9A84C30' }}
            />
            {/* Card 2 (mid) */}
            <div
              className="absolute top-4 left-4 right-0 bottom-0 rounded-3xl rotate-3 opacity-60"
              style={{ background: isDarkMode ? '#1F2329' : '#fff', border: '1px solid #C9A84C40' }}
            />
            {/* Card 1 (front) */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-4 shadow-2xl"
              style={{
                background: isDarkMode ? '#1F2329' : '#fff',
                border: '1px solid #C9A84C30',
              }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
                <RiCustomerService2Line size={32} color="#fff" />
              </div>
              <div className="text-center">
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>24/7 Support</p>
                <p className="text-sm" style={{ color: '#C9A84C' }}>Always here for you</p>
              </div>
              {/* Dots */}
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 1 ? '#C9A84C' : '#C9A84C40' }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
