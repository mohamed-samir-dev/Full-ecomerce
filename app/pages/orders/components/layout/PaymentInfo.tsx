import { CreditCardIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import {PaymentInfoProps}from '../../types/types'


export default function PaymentInfo({ paymentMethod, isDarkMode, isArabic }: PaymentInfoProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-1.5 sm:gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <CreditCardIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('orders.paymentMethod')}
          </p>
        </div>
        <p className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {paymentMethod}
        </p>
      </div>
    </div>
  );
}
