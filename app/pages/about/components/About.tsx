'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { RiShieldCheckLine, RiTruckLine, RiMedalLine, RiCustomerService2Line } from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { TbRocket, TbUsers, TbStar, TbPackage } from 'react-icons/tb';
import { PiCrownSimpleBold } from 'react-icons/pi';

const gold = '#C9A84C';
const goldDark = '#8B6914';
const goldGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function About() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  const stats = [
    { icon: <TbUsers size={22} />, value: '50K+', label: isArabic ? 'عميل سعيد' : 'Happy Clients' },
    { icon: <TbPackage size={22} />, value: '10K+', label: isArabic ? 'منتج' : 'Products' },
    { icon: <TbStar size={22} />, value: '4.9', label: isArabic ? 'تقييم' : 'Rating' },
    { icon: <TbRocket size={22} />, value: '5+', label: isArabic ? 'سنوات خبرة' : 'Years' },
  ];

  const features = [
    {
      icon: <RiMedalLine size={26} />,
      title: t('about.features.quality'),
      desc: t('about.features.qualityDesc'),
    },
    {
      icon: <RiTruckLine size={26} />,
      title: t('about.features.shipping'),
      desc: t('about.features.shippingDesc'),
    },
    {
      icon: <RiShieldCheckLine size={26} />,
      title: t('about.features.secure'),
      desc: t('about.features.secureDesc'),
    },
    {
      icon: <RiCustomerService2Line size={26} />,
      title: t('about.features.prices'),
      desc: t('about.features.pricesDesc'),
    },
  ];

  const milestones = [
    { year: '2020', key: 'founded' },
    { year: '2021', key: 'growing' },
    { year: '2022', key: 'expansion' },
    { year: '2023', key: 'innovation' },
    { year: '2024', key: 'leader' },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* bg blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12 sm:pb-16 relative z-10">
          <motion.div {...fadeUp()} className="text-center space-y-4 sm:space-y-5">
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border text-[11px] sm:text-xs font-bold tracking-widest uppercase"
              style={{ borderColor: `${gold}50`, color: gold, background: `${gold}10` }}>
              <PiCrownSimpleBold size={12} />
              {isArabic ? 'من نحن' : 'Our Story'}
            </div>

            <h1 className={`text-3xl sm:text-5xl md:text-6xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('about.hero.title')}{' '}
              <span
                className="font-serif italic"
                style={{ background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {t('about.hero.brand')}
              </span>
            </h1>

            <p className={`max-w-xl mx-auto text-sm sm:text-base lg:text-lg px-2 sm:px-0 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
              {t('about.hero.subtitle')}
            </p>

            {/* gold line */}
            <div className="flex justify-center pt-1 sm:pt-2">
              <div className="h-[2px] w-16 sm:w-20 rounded-full" style={{ background: goldGradient }} />
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.15)} className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#C9A84C]/40' : 'bg-white border-gray-100 hover:border-[#C9A84C]/40'
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${gold}10 0%, transparent 70%)` }} />
                <div className="flex justify-center mb-2" style={{ color: gold }}>{s.icon}</div>
                <div className="text-xl sm:text-2xl font-black" style={{ background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <div className={`text-[11px] sm:text-xs mt-1 font-medium ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className={`py-12 sm:py-16 lg:py-20 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4" style={{ color: gold }}>
              <HiOutlineSparkles size={16} />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase">{t('about.features.title')}</span>
              <HiOutlineSparkles size={16} />
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'لماذا نحن الأفضل' : 'Why We Stand Out'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className={`group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 border overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 ${
                  isDarkMode ? 'bg-[#1F1F1F] border-white/8 hover:border-[#C9A84C]/30' : 'bg-[#FAFAF8] border-gray-100 hover:border-[#C9A84C]/40'
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${gold}08 0%, transparent 60%)` }} />

                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${gold}15`, color: gold }}
                >
                  {f.icon}
                </div>

                <h3 className={`font-bold text-sm sm:text-base mb-1 sm:mb-1.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{f.desc}</p>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: goldGradient }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY / MILESTONES ── */}
      <section className={`py-12 sm:py-16 lg:py-20 ${isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-10 sm:mb-14">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('about.journey.title')}
            </h2>
            <div className="flex justify-center mt-3">
              <div className="h-[2px] w-16 rounded-full" style={{ background: goldGradient }} />
            </div>
          </motion.div>

          <div className="relative">
            {/* connector line — desktop only */}
            <div
              className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] mx-16"
              style={{ background: `linear-gradient(to ${isArabic ? 'left' : 'right'}, transparent, ${gold}60, transparent)` }}
            />

            {/* mobile: vertical timeline, tablet: 2-col, desktop: 5-col */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  className={`relative rounded-xl sm:rounded-2xl border group transition-all duration-300 hover:-translate-y-1 ${
                    isDarkMode ? 'bg-[#1A1A1A] border-white/8 hover:border-[#C9A84C]/40' : 'bg-white border-gray-100 hover:border-[#C9A84C]/40'
                  }`}
                >
                  {/* mobile: horizontal layout, sm+: vertical/centered */}
                  <div className="flex sm:flex-col sm:items-center sm:text-center items-start gap-4 p-4 sm:p-5">
                    <div
                      className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ background: goldGradient }}
                    >
                      {m.year.slice(2)}
                    </div>
                    <div className="flex-1 sm:flex-none">
                      <div className="text-xs sm:text-sm font-bold mb-0.5 sm:mb-1" style={{ color: gold }}>{m.year}</div>
                      <h3 className={`text-sm font-bold mb-0.5 sm:mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {t(`about.timeline.${m.key}`)}
                      </h3>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>
                        {t(`about.timeline.${m.key}Desc`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp()}
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14 text-center border ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/8' : 'bg-white border-gray-100'
            }`}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${gold}08 0%, transparent 70%)` }} />

            <PiCrownSimpleBold size={32} className="mx-auto mb-3 sm:mb-4" style={{ color: gold }} />
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'انضم إلى عائلة جلوبال شوب' : 'Join the Global Shop Family'}
            </h2>
            <p className={`text-sm sm:text-base mb-6 sm:mb-7 max-w-md mx-auto px-2 sm:px-0 ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}>
              {isArabic
                ? 'آلاف العملاء يثقون بنا يومياً — كن جزءاً من التجربة'
                : 'Thousands of customers trust us daily — be part of the experience'}
            </p>
            <a
              href="/pages/shop"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ background: goldGradient }}
            >
              <TbRocket size={15} />
              {isArabic ? 'تسوق الآن' : 'Shop Now'}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
