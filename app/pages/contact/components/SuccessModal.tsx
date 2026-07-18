'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { BsCheckLg } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { TbMessageCircleCheck } from 'react-icons/tb';

interface SuccessModalProps {
  onClose: () => void;
}

const confettiDots = [
  { x: -55, y: -45, size: 6,  delay: 0.1,  color: '#C9A84C' },
  { x:  55, y: -55, size: 4,  delay: 0.15, color: '#8B6914' },
  { x: -70, y:  15, size: 5,  delay: 0.2,  color: '#E8C96A' },
  { x:  70, y:   8, size: 4,  delay: 0.12, color: '#C9A84C' },
  { x: -35, y:  60, size: 3,  delay: 0.25, color: '#8B6914' },
  { x:  45, y:  58, size: 5,  delay: 0.18, color: '#E8C96A' },
];

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          /* Full width on mobile (bottom sheet), max-sm on sm+ */
          className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: isDarkMode ? '#1A1A1A' : '#ffffff',
            border: '1px solid',
            borderColor: isDarkMode ? '#C9A84C25' : '#C9A84C30',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gradient bar */}
          <div className="h-1.5" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C, #E8C96A, #C9A84C, #8B6914)' }} />

          {/* Mobile drag handle */}
          <div className="flex justify-center pt-3 sm:hidden">
            <div className={`w-10 h-1 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-gray-300'}`} />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white/50' : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
            }`}
          >
            <IoCloseOutline size={17} />
          </button>

          <div className="px-6 sm:px-8 pt-4 sm:pt-8 pb-7 sm:pb-10 text-center">

            {/* Animated icon with rings */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 sm:mb-7 flex items-center justify-center">
              {/* Outer ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid #C9A84C20' }}
              />
              {/* Mid ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute inset-3 rounded-full"
                style={{ border: '2px solid #C9A84C35' }}
              />
              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-5 rounded-full"
                style={{ background: '#C9A84C20' }}
              />
              {/* Main circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.25 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
              >
                <BsCheckLg size={24} color="#fff" />
              </motion.div>

              {/* Confetti dots */}
              {confettiDots.map((dot, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{ scale: 1, x: dot.x, y: dot.y, opacity: [0, 1, 0] }}
                  transition={{ delay: dot.delay + 0.3, duration: 0.6, ease: 'easeOut' }}
                  className="absolute rounded-full"
                  style={{
                    width: dot.size, height: dot.size, background: dot.color,
                    top: '50%', left: '50%',
                    marginTop: -dot.size / 2, marginLeft: -dot.size / 2,
                  }}
                />
              ))}
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <TbMessageCircleCheck size={17} style={{ color: '#C9A84C' }} />
              <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.modal.title')}
              </h3>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-xs sm:text-sm leading-relaxed mb-5 sm:mb-7 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}
            >
              {t('contact.modal.subtitle')}
            </motion.p>

            {/* Response time badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-5 sm:mb-6"
              style={{ background: '#C9A84C15', border: '1px solid #C9A84C30' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold" style={{ color: '#C9A84C' }}>
                {t('contact.modal.responseTime')}
              </span>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
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
