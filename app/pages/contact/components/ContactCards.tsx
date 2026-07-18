'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsGeoAlt, BsClock } from 'react-icons/bs';

const cards = [
  {
    icon: HiOutlineMail,
    titleKey: 'contact.cards.email',
    infoKey: 'contact.cards.emailInfo',
    subKey: 'contact.cards.emailSub',
    gradient: 'linear-gradient(135deg, #8B6914, #C9A84C)',
  },
  {
    icon: BsTelephone,
    titleKey: 'contact.cards.phone',
    infoKey: 'contact.cards.phoneInfo',
    subKey: 'contact.cards.phoneSub',
    gradient: 'linear-gradient(135deg, #7B5E12, #B8943E)',
  },
  {
    icon: BsGeoAlt,
    titleKey: 'contact.cards.location',
    infoKey: 'contact.cards.locationInfo',
    subKey: 'contact.cards.locationSub',
    gradient: 'linear-gradient(135deg, #9A7520, #D4A84C)',
  },
  {
    icon: BsClock,
    titleKey: 'contact.cards.hours',
    infoKey: 'contact.cards.hoursInfo',
    subKey: 'contact.cards.hoursSub',
    gradient: 'linear-gradient(135deg, #6B5010, #A88030)',
  },
];

export default function ContactCards() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {/* 1 col mobile → 2 col sm → 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map(({ icon: Icon, titleKey, infoKey, subKey, gradient }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.18 } }}
              className={`group relative rounded-2xl p-4 sm:p-5 overflow-hidden cursor-default shadow-md ${
                isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'
              }`}
              style={{ border: '1px solid', borderColor: isDarkMode ? '#C9A84C15' : '#C9A84C20' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, #C9A84C08, transparent 70%)' }}
              />
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient }}
              />

              {/* sm: horizontal layout, lg: vertical */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
                {/* Icon */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 sm:mb-3 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ background: gradient }}
                >
                  <Icon size={18} color="#fff" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isDarkMode ? 'text-white/35' : 'text-gray-400'}`}>
                    {t(titleKey)}
                  </p>
                  <p className={`text-xs sm:text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t(infoKey)}
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                    {t(subKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
