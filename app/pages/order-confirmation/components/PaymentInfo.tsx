import { CreditCardIcon } from '@heroicons/react/24/outline';
import {PaymentInfoProps}from '../types/types'
import { useTranslation } from '@/i18n';


export default function PaymentInfo({ paymentMethod, orderId, isPrivateView, isDarkMode }: PaymentInfoProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.paymentMethod')}</h3>
      <div className="flex items-center gap-3 mb-4">
        <CreditCardIcon className="w-6 h-6 text-blue-500" />
        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {isPrivateView ? '••••••••••' : paymentMethod}
        </span>
      </div>
      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        <p>{t('orderConfirmation.transactionId')}: {isPrivateView ? '••••••••' : orderId.slice(0, 16)}</p>
        <p className="mt-1">{t('orderConfirmation.paymentStatus')}: <span className="text-green-600 font-medium">{t('orderConfirmation.completed')}</span></p>
      </div>
    </div>
  );
}
