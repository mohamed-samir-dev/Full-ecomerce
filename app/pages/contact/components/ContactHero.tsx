'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { RiCustomerService2Line } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsStarFill } from 'react-icons/bs';
import { TbMessageCircle } from 'react-icons/tb';

const stats = [
  { valueKey: 'contact.hero.stat1Value', labelKey: 'contact.hero.stat1Label', icon: BsStarFill },
  { valueKey: 'contact.hero.stat2Value', labelKey: 'contact.hero.stat2Label', icon: TbMessageCircle },
  { valueKey: 'contact.hero.stat3Value', labelKey: 'contact.hero.stat3Label', icon: RiCustomerService2Line },
];

export default function ContactHero() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative overflow-hidden ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#F5F0EA]'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Animated gold orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-16 -right-16 w-56 h-56 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-28 pb-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">

          {/* ── Left: Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="pb-10 sm:pb-14 lg:pb-24 space-y-5 sm:space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border"
              style={{ borderColor: '#C9A84C40', background: 'linear-gradient(135deg, #C9A84C15, #8B691408)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#C9A84C' }}>
                {t('contact.hero.badge')}
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {t('contact.hero.title')}
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 50%, #E8C96A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('contact.hero.highlight')}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-md ${isDarkMode ? 'text-white/55' : 'text-gray-600'}`}
            >
              {t('contact.hero.subtitle')}
            </motion.p>

            {/* Quick contact pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3"
            >
              {[
                { icon: HiOutlineMail, text: 'support@example.com' },
                { icon: BsTelephone, text: '+1 (555) 123-4567' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white/70' : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <Icon size={13} style={{ color: '#C9A84C' }} />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Floating card — desktop only ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center"
          >
            <div
              className="relative w-full max-w-xs xl:max-w-sm rounded-t-3xl overflow-hidden shadow-2xl"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(160deg, #1F2329 0%, #252A31 100%)'
                  : 'linear-gradient(160deg, #ffffff 0%, #f8f5f0 100%)',
                border: '1px solid',
                borderColor: isDarkMode ? '#C9A84C20' : '#C9A84C30',
                borderBottom: 'none',
              }}
            >
              <div className="h-1" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C, #E8C96A)' }} />
              <div className="p-6 xl:p-8 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                  >
                    <RiCustomerService2Line size={24} color="#fff" />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t('contact.hero.cardTitle')}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400 font-semibold">{t('contact.hero.cardStatus')}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {stats.map(({ valueKey, labelKey, icon: Icon }) => (
                    <div
                      key={valueKey}
                      className={`rounded-xl p-2.5 text-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}
                    >
                      <Icon size={14} className="mx-auto mb-1" style={{ color: '#C9A84C' }} />
                      <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t(valueKey)}</p>
                      <p className={`text-[9px] font-medium ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{t(labelKey)}</p>
                    </div>
                  ))}
                </div>

                {/* Message preview */}
                <div className={`rounded-xl p-3.5 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-[10px] font-bold mb-2 uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                    {t('contact.hero.cardPreviewLabel')}
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1.5">
                      <div className={`h-1.5 rounded-full w-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                      <div className={`h-1.5 rounded-full w-3/4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                      <div className={`h-1.5 rounded-full w-1/2 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                    </div>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 self-end"
                      style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                    >
                      <TbMessageCircle size={14} color="#fff" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave divider */}
      <div className="relative h-8 sm:h-12 overflow-hidden -mt-1">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48L60 40C120 32 240 16 360 12C480 8 600 16 720 20C840 24 960 24 1080 20C1200 16 1320 8 1380 4L1440 0V48H0Z"
            fill={isDarkMode ? '#141414' : '#F5F0EA'}
          />
        </svg>
      </div>
    </div>
  );
}
