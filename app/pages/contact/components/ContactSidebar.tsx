'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import {
  BsLightningCharge, BsShieldCheck, BsStars,
  BsChevronDown, BsInstagram, BsTwitterX, BsFacebook,
} from 'react-icons/bs';
import { LuClock3 } from 'react-icons/lu';
import { TbBrandWhatsapp } from 'react-icons/tb';

const benefits = [
  { icon: BsLightningCharge, titleKey: 'contact.sidebar.quickResponse', descKey: 'contact.sidebar.quickResponseDesc' },
  { icon: BsShieldCheck,     titleKey: 'contact.sidebar.expertSupport',  descKey: 'contact.sidebar.expertSupportDesc' },
  { icon: BsStars,           titleKey: 'contact.sidebar.personalizedCare', descKey: 'contact.sidebar.personalizedCareDesc' },
];

const hours = [
  { dayKey: 'contact.sidebar.monday',   timeKey: 'contact.sidebar.mondayTime',   active: true },
  { dayKey: 'contact.sidebar.saturday', timeKey: 'contact.sidebar.saturdayTime', active: true },
  { dayKey: 'contact.sidebar.sunday',   timeKey: 'contact.sidebar.sundayTime',   active: false },
];

const socials = [
  { icon: BsInstagram,    label: 'Instagram', href: '#', color: '#E1306C' },
  { icon: BsTwitterX,     label: 'X',         href: '#', color: isDark => isDark ? '#fff' : '#000' },
  { icon: BsFacebook,     label: 'Facebook',  href: '#', color: '#1877F2' },
  { icon: TbBrandWhatsapp,label: 'WhatsApp',  href: '#', color: '#25D366' },
];

const faqs = [
  { qKey: 'contact.faq.q1', aKey: 'contact.faq.a1' },
  { qKey: 'contact.faq.q2', aKey: 'contact.faq.a2' },
  { qKey: 'contact.faq.q3', aKey: 'contact.faq.a3' },
];

export default function ContactSidebar() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const card = `rounded-2xl overflow-hidden shadow-md ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`;
  const cardBorder = { border: '1px solid', borderColor: isDarkMode ? '#C9A84C15' : '#C9A84C20' } as React.CSSProperties;

  return (
    <div className="lg:col-span-2 space-y-3 sm:space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>

      {/* ── Why reach out ── */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className={card}
        style={cardBorder}
      >
        <div className="h-[2px]" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C)' }} />
        <div className="p-4 sm:p-5">
          <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white/45' : 'text-gray-400'}`}>
            {t('contact.sidebar.whyReachOut')}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {benefits.map(({ icon: Icon, titleKey, descKey }, i) => (
              <div key={titleKey} className="flex items-start gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                  >
                    <Icon size={13} color="#fff" />
                  </div>
                  {i < benefits.length - 1 && (
                    <div className="w-px h-4 mt-1" style={{ background: 'linear-gradient(to bottom, #C9A84C40, transparent)' }} />
                  )}
                </div>
                <div className="pt-0.5">
                  <p className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t(titleKey)}</p>
                  <p className={`text-[11px] sm:text-xs mt-0.5 leading-relaxed ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Business Hours ── */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.07 }}
        className={card}
        style={cardBorder}
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: '#C9A84C15' }}>
              <LuClock3 size={13} style={{ color: '#C9A84C' }} />
            </div>
            <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-white/45' : 'text-gray-400'}`}>
              {t('contact.sidebar.businessHours')}
            </h3>
          </div>
          <div className="space-y-2">
            {hours.map(({ dayKey, timeKey, active }) => (
              <div
                key={dayKey}
                className={`flex justify-between items-center px-3 sm:px-4 py-2.5 rounded-xl ${
                  active
                    ? isDarkMode ? 'bg-[#C9A84C0D] border border-[#C9A84C25]' : 'bg-[#C9A84C08] border border-[#C9A84C25]'
                    : isDarkMode ? 'bg-white/[0.03]' : 'bg-gray-50'
                }`}
              >
                <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-white/65' : 'text-gray-700'}`}>{t(dayKey)}</span>
                <span
                  className="text-xs sm:text-sm font-bold"
                  style={{ color: active ? '#C9A84C' : isDarkMode ? '#ffffff30' : '#9ca3af' }}
                >
                  {t(timeKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── FAQ Accordion ── */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.14 }}
        className={card}
        style={cardBorder}
      >
        <div className="p-4 sm:p-5">
          <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 ${isDarkMode ? 'text-white/45' : 'text-gray-400'}`}>
            {t('contact.faq.title')}
          </h3>
          <div className="space-y-1.5 sm:space-y-2">
            {faqs.map(({ qKey, aKey }, i) => (
              <div
                key={qKey}
                className={`rounded-xl overflow-hidden border transition-colors duration-200 ${
                  openFaq === i
                    ? isDarkMode ? 'border-[#C9A84C30]' : 'border-[#C9A84C40]'
                    : isDarkMode ? 'border-white/[0.06]' : 'border-gray-100'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 ${isArabic ? 'text-right' : 'text-left'} transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-[11px] sm:text-xs font-semibold leading-snug ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>
                    {t(qKey)}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <BsChevronDown size={11} style={{ color: '#C9A84C' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className={`px-3 sm:px-4 pb-3 text-[11px] sm:text-xs leading-relaxed ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>
                        {t(aKey)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Social Links ── */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.21 }}
        className={card}
        style={cardBorder}
      >
        <div className="p-4 sm:p-5">
          <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 ${isDarkMode ? 'text-white/45' : 'text-gray-400'}`}>
            {t('contact.sidebar.followUs')}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {socials.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`flex flex-col items-center gap-1 py-2.5 sm:py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} style={{ color: typeof color === 'function' ? color(isDarkMode) : color }} />
                <span className={`text-[9px] sm:text-[10px] font-semibold ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}
