import { CreditCardIcon } from '@heroicons/react/24/outline';
import { SummaryHeaderProps } from '../../../types/cart';

export default function SummaryHeader({ isDarkMode, isArabic }: SummaryHeaderProps) {
  return (
    <>
      <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <CreditCardIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? 'ملخص الطلب' : 'Order Summary'}
        </h2>
      </div>
      <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }} />
    </>
  );
}
