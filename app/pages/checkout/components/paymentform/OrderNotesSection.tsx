import { motion } from 'framer-motion';
import { OrderNotesSectionProps } from '../../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function OrderNotesSection({ notes, setNotes, isLoading, onBack, onSubmit, isDarkMode }: OrderNotesSectionProps) {
  const { t, isArabic } = useTranslation();

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
      }`}
    >
      <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {t('checkout.orderNotes')}
        <span className={`font-normal text-xs ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          ({isArabic ? 'اختياري' : 'Optional'})
        </span>
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all resize-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 ${
          isDarkMode
            ? 'bg-[#191C21] border-white/10 text-white placeholder-gray-500'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
        }`}
        placeholder={t('checkout.orderNotesPlaceholder')}
      />

      <div className={`flex gap-3 mt-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className={`flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm border transition-all ${
            isDarkMode
              ? 'border-white/10 text-gray-300 hover:bg-white/5'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {t('checkout.back')}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={isLoading}
          className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {t('checkout.processing')}
            </span>
          ) : t('checkout.confirmOrder')}
        </motion.button>
      </div>
    </div>
  );
}
