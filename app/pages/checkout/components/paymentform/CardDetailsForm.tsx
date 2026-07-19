import { motion } from 'framer-motion';
import { CardDetailsFormProps } from '../../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

const inputCls = (isDarkMode: boolean) =>
  `w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 ${
    isDarkMode
      ? 'bg-[#191C21] border-white/10 text-white placeholder-gray-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
  }`;

export default function CardDetailsForm({ cardDetails, setCardDetails, isDarkMode }: CardDetailsFormProps) {
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
        {t('checkout.cardInfo')}
      </h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder={t('checkout.cardNumber')}
          value={cardDetails.number}
          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          className={inputCls(isDarkMode)}
          maxLength={19}
        />
        <input
          type="text"
          placeholder={t('checkout.cardholderName')}
          value={cardDetails.name}
          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
          className={inputCls(isDarkMode)}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder={t('checkout.expiry')}
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            className={inputCls(isDarkMode)}
            maxLength={5}
          />
          <input
            type="text"
            placeholder={t('checkout.cvv')}
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            className={inputCls(isDarkMode)}
            maxLength={4}
          />
        </div>
      </div>
    </motion.div>
  );
}
