import { motion } from 'framer-motion';
import { WalletDetailsFormProps } from '../../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function WalletDetailsForm({ walletPhone, setWalletPhone, isDarkMode }: WalletDetailsFormProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`mt-4 p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#191C21] border-[#C9A84C]/20' : 'bg-gray-50 border-[#C9A84C]/20'
      }`}
    >
      <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {t('checkout.walletDetails')}
      </h3>
      <input
        type="tel"
        placeholder={t('checkout.mobileNumber')}
        value={walletPhone}
        onChange={(e) => setWalletPhone(e.target.value)}
        className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 ${
          isDarkMode
            ? 'bg-[#191C21] border-white/10 text-white placeholder-gray-500'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
        }`}
        maxLength={11}
      />
    </motion.div>
  );
}
