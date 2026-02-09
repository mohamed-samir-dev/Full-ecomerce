import { motion } from 'framer-motion';
import{CardDetailsFormProps}from '../../types/checkout'
import { useTranslation } from '@/i18n/hooks/useTranslation';


export default function CardDetailsForm({ cardDetails, setCardDetails, isDarkMode }: CardDetailsFormProps) {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 ${isDarkMode ? 'bg-[#191C21] border-blue-700' : 'bg-white border-blue-200'}`}
    >
      <h3 className={`text-base sm:text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('checkout.cardInfo')}</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={t('checkout.cardNumber')}
          value={cardDetails.number}
          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-[#191C21] border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900'}`}
          maxLength={19}
        />
        <input
          type="text"
          placeholder={t('checkout.cardholderName')}
          value={cardDetails.name}
          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-[#191C21] border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900'}`}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t('checkout.expiry')}
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-[#191C21] border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900'}`}
            maxLength={5}
          />
          <input
            type="text"
            placeholder={t('checkout.cvv')}
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-[#191C21] border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900'}`}
            maxLength={4}
          />
        </div>
      </div>
    </motion.div>
  );
}
