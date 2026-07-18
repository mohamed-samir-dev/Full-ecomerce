'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { BsLightningCharge, BsShieldCheck, BsStars } from 'react-icons/bs';
import { LuClock3 } from 'react-icons/lu';

export default function ContactSidebar() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  const benefits = [
    { icon: BsLightningCharge, titleKey: 'contact.sidebar.quickResponse', descKey: 'contact.sidebar.quickResponseDesc' },
    { icon: BsShieldCheck, titleKey: 'contact.sidebar.expertSupport', descKey: 'contact.sidebar.expertSupportDesc' },
    { icon: BsStars, titleKey: 'contact.sidebar.personalizedCare', descKey: 'contact.sidebar.personalizedCareDesc' },
  ];

  const hours = [
    { dayKey: 'contact.sidebar.monday', timeKey: 'contact.sidebar.mondayTime', active: true },
    { dayKey: 'contact.sidebar.saturday', timeKey: 'contact.sidebar.saturdayTime', active: true },
    { dayKey: 'contact.sidebar.sunday', timeKey: 'contact.sidebar.sundayTime', active: false },
  ];

  return (
    <div className="lg:col-span-2 space-y-5" dir={isArabic ? 'rtl' : 'ltr'}>

      {/* Why reach out */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl overflow-hidden shadow-xl ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}
      >
        {/* Top accent */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C)' }} />

        <div className="p-6 sm:p-7">
          <h3 className={`text-base sm:text-lg font-bold mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('contact.sidebar.whyReachOut')}
          </h3>

          <div className="space-y-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={b.titleKey} className="flex items-start gap-3.5">
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                    >
                      <Icon size={15} color="#fff" />
                    </div>
                    {i < benefits.length - 1 && (
                      <div className="w-px h-6 mt-1" style={{ background: '#C9A84C30' }} />
                    )}
                  </div>
                  <div className="pb-1">
                    <p className={`text-sm font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t(b.titleKey)}
                    </p>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      {t(b.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`rounded-3xl p-6 sm:p-7 shadow-xl ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: '#C9A84C15' }}>
            <LuClock3 size={16} style={{ color: '#C9A84C' }} />
          </div>
          <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('contact.sidebar.businessHours')}
          </h3>
        </div>

        <div className="space-y-2.5">
          {hours.map((h) => (
            <div
              key={h.dayKey}
              className={`flex justify-between items-center px-4 py-2.5 rounded-xl ${
                h.active
                  ? isDarkMode ? 'bg-[#C9A84C10] border border-[#C9A84C20]' : 'bg-[#C9A84C08] border border-[#C9A84C20]'
                  : isDarkMode ? 'bg-white/5' : 'bg-gray-50'
              }`}
            >
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                {t(h.dayKey)}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: h.active ? '#C9A84C' : isDarkMode ? '#ffffff40' : '#9ca3af' }}
              >
                {t(h.timeKey)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
