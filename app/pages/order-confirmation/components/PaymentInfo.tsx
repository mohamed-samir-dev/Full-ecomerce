import { motion } from 'framer-motion';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { PaymentInfoProps } from '../types/types';
import { useTranslation } from '@/i18n';

export default function PaymentInfo({ paymentMethod, orderId, isPrivateView, isDarkMode }: PaymentInfoProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className={`rounded-2xl border p-6 transition-all ${
        isDarkMode
          ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/20'
          : 'bg-white border-black/5 hover:border-[#C9A84C]/20'
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <CreditCardIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orderConfirmation.paymentMethod')}
        </h3>
      </div>
      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />
      <div className={`text-sm space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="font-medium">{isPrivateView ? '••••••••••' : paymentMethod}</p>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {t('orderConfirmation.transactionId')}: {isPrivateView ? '••••••••' : orderId.slice(0, 16)}
        </p>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          {t('orderConfirmation.paymentStatus')}:{' '}
          <span className="font-medium" style={{ color: '#C9A84C' }}>{t('orderConfirmation.completed')}</span>
        </p>
      </div>
    </motion.div>
  );
}
