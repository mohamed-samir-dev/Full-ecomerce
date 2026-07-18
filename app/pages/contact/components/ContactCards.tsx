'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { MdOutlineEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LuClock3 } from 'react-icons/lu';

export default function ContactCards() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  const cards = [
    { icon: MdOutlineEmail, titleKey: 'contact.cards.email', infoKey: 'contact.cards.emailInfo', color: '#C9A84C' },
    { icon: BsTelephone, titleKey: 'contact.cards.phone', infoKey: 'contact.cards.phoneInfo', color: '#C9A84C' },
    { icon: HiOutlineLocationMarker, titleKey: 'contact.cards.location', infoKey: 'contact.cards.locationInfo', color: '#C9A84C' },
    { icon: LuClock3, titleKey: 'contact.cards.hours', infoKey: 'contact.cards.hoursInfo', color: '#C9A84C' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden transition-all duration-300 ${
                isDarkMode ? 'bg-[#1F2329]' : 'bg-white'
              } shadow-lg`}
            >
              {/* Left accent bar */}
              <div
                className={`absolute top-0 ${isArabic ? 'right-0' : 'left-0'} w-1 h-full rounded-full`}
                style={{ background: 'linear-gradient(to bottom, #8B6914, #C9A84C)' }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#C9A84C15' }}
              >
                <Icon size={22} style={{ color: '#C9A84C' }} />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  {t(card.titleKey)}
                </p>
                <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t(card.infoKey)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
