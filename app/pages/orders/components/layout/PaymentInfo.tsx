import { CreditCardIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { PaymentInfoProps } from '../../types/types';

export default function PaymentInfo({ paymentMethod, isDarkMode, isArabic }: PaymentInfoProps) {
  const { t } = useTranslation();

  return (
    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'}`}>
      <div className={`flex items-center gap-2 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <CreditCardIcon className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orders.paymentMethod')}
        </h4>
      </div>
      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isArabic ? 'text-right' : ''}`}>
        {paymentMethod}
      </p>
    </div>
  );
}
