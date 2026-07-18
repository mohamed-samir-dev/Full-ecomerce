'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { IoCloseOutline } from 'react-icons/io5';
import { AlertTriangle } from 'lucide-react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: isDarkMode ? '#1A1A1A' : '#ffffff',
            border: '1px solid',
            borderColor: isDarkMode ? '#ef444425' : '#ef444430',
          }}
          onClick={(e) => e.stopPropagation()}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {/* Top gradient bar */}
          <div className="h-1.5" style={{ background: 'linear-gradient(to right, #b91c1c, #ef4444, #fca5a5, #ef4444, #b91c1c)' }} />

          {/* Close */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white/50' : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
            }`}
          >
            <IoCloseOutline size={18} />
          </button>

          <div className="px-8 py-10 text-center">
            {/* Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 rounded-full"
                style={{ background: '#ef444420' }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.15 }}
                className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}
              >
                <AlertTriangle size={28} color="#fff" />
              </motion.div>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {isArabic ? 'فشل إرسال الرسالة' : 'Failed to Send Message'}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-sm leading-relaxed mb-7 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}
            >
              {message}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)' }}
            >
              {isArabic ? 'حسناً، سأحاول مجدداً' : 'OK, Try Again'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
