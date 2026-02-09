import { motion } from 'framer-motion';
import {OrderNotesSectionProps} from '../../types/checkout'
import { useTranslation } from '@/i18n/hooks/useTranslation';


export default function OrderNotesSection({ notes, setNotes, isLoading, onBack, onSubmit, isDarkMode }: OrderNotesSectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`rounded-2xl shadow-xl p-4 sm:p-6 border ${isDarkMode ? 'bg-[#191C21] border-slate-700' : 'bg-white border-gray-100'}`}>
      <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
        {t('checkout.orderNotes')}
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${isDarkMode ? 'bg-[#191C21] border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-200 text-gray-900'}`}
        placeholder={t('checkout.orderNotesPlaceholder')}
      />
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className={`w-full sm:flex-1 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-xl font-semibold transition-colors ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {t('checkout.back')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full sm:flex-1 bg-linear-to-r from-green-600 to-green-500 text-white py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? t('checkout.processing') : t('checkout.confirmOrder')}
        </motion.button>
      </div>
    </div>
  );
}
