import { motion } from 'framer-motion';
import {WalletDetailsFormProps}from '../../types/checkout'
import { useTranslation } from '@/i18n/hooks/useTranslation';


export default function WalletDetailsForm({ walletPhone, setWalletPhone, isDarkMode }: WalletDetailsFormProps) {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 ${isDarkMode ? 'bg-[#191C21] border-purple-700' : 'bg-white border-purple-200'}`}
    >
      <h3 className={`text-base sm:text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('checkout.walletDetails')}</h3>
      <input
        type="tel"
        placeholder={t('checkout.mobileNumber')}
        value={walletPhone}
        onChange={(e) => setWalletPhone(e.target.value)}
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-purple-500 ${isDarkMode ? 'bg-[#191C21] border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900'}`}
        maxLength={11}
      />
    </motion.div>
  );
}
