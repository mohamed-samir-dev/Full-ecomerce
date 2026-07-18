'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { BsLightningCharge, BsShieldCheck, BsStars, BsChevronDown, BsInstagram, BsTwitterX, BsFacebook } from 'react-icons/bs';
import { LuClock3 } from 'react-icons/lu';
import { TbBrandWhatsapp } from 'react-icons/tb';

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

const socials = [
  { icon: BsInstagram, label: 'Instagram', href: '#', color: '#E1306C' },
  { icon: BsTwitterX, label: 'X', href: '#', color: '#000000' },
  { icon: BsFacebook, label: 'Facebook', href: '#', color: '#1877F2' },
  { icon: TbBrandWhatsapp, label: 'WhatsApp', href: '#', color: '#25D366' },
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

  const cardClass = `rounded-2xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`;
  const cardStyle = { border: '1px solid', borderColor: isDarkMode ? '#C9A84C15' : '#C9A84C20' };

  return (
    <div className="lg:col-span-2 space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>

      {/* Why reach out */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cardClass}
        style={cardStyle}
      >
        <div className="h-[2px]" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C)' }} />
        <div className="p-5 sm:p-6">
          <h3 className={`text-sm font-black uppercase tracking-widest mb-5 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`}>
            {t('contact.sidebar.whyReachOut')}
          </h3>
          <div className="space-y-4">
            {benefits.map(({ icon: Icon, titleKey, descKey }, i) => (
              <div key={titleKey} className="flex items-start gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                  >
                    <Icon size={15} color="#fff" />
                  </div>
                  {i < benefits.length - 1 && (
                    <div className="w-px h-5 mt-1.5" style={{ background: 'linear-gradient(to bottom, #C9A84C40, transparent)' }} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t(titleKey)}</p>
                  <p className={`text-xs mt-0.5 leading-relaxed ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className={cardClass}
        style={cardStyle}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#C9A84C15' }}>
              <LuClock3 size={15} style={{ color: '#C9A84C' }} />
            </div>
            <h3 className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`}>
              {t('contact.sidebar.businessHours')}
            </h3>
          </div>
          <div className="space-y-2">
            {hours.map(({ dayKey, timeKey, active }) => (
              <div
                key={dayKey}
                className={`flex justify-between items-center px-4 py-3 rounded-xl ${
                  active
                    ? isDarkMode ? 'bg-[#C9A84C0D] border border-[#C9A84C25]' : 'bg-[#C9A84C08] border border-[#C9A84C25]'
                    : isDarkMode ? 'bg-white/[0.03]' : 'bg-gray-50'
                }`}
              >
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white/65' : 'text-gray-700'}`}>{t(dayKey)}</span>
                <span className="text-sm font-bold" style={{ color: active ? '#C9A84C' : isDarkMode ? '#ffffff30' : '#9ca3af' }}>
                  {t(timeKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className={cardClass}
        style={cardStyle}
      >
        <div className="p-5 sm:p-6">
          <h3 className={`text-sm font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`}>
            {t('contact.faq.title')}
          </h3>
          <div className="space-y-2">
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
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{t(qKey)}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <BsChevronDown size={12} style={{ color: '#C9A84C', flexShrink: 0 }} />
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
                      <p className={`px-4 pb-3 text-xs leading-relaxed ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>
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

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.24 }}
        className={cardClass}
        style={cardStyle}
      >
        <div className="p-5 sm:p-6">
          <h3 className={`text-sm font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`}>
            {t('contact.sidebar.followUs')}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {socials.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} style={{ color }} />
                <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
