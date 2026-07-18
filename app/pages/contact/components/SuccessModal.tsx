'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { BsCheckCircle } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gradient bar */}
          <div className="h-1.5" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C, #8B6914)' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
            }`}
          >
            <IoCloseOutline size={18} />
          </button>

          <div className="px-8 py-10 text-center">
            {/* Animated check icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
              className="relative w-20 h-20 mx-auto mb-6"
            >
              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full"
                style={{ background: '#C9A84C20' }}
              />
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
              >
                <BsCheckCircle size={36} color="#fff" />
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('contact.modal.title')}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className={`text-sm mb-8 leading-relaxed ${isDarkMode ? 'text-white/55' : 'text-gray-500'}`}
            >
              {t('contact.modal.subtitle')}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
            >
              {t('contact.modal.close')}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
