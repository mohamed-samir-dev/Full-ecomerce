import { CreditCardIcon } from '@heroicons/react/24/outline';
import {SummaryHeaderProps}from '../../../types/cart'

export default function SummaryHeader({ isDarkMode, isArabic }: SummaryHeaderProps) {
  return (
    <div className={`flex items-center gap-2 mb-4 sm:mb-5 md:mb-6 lg:mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
        <CreditCardIcon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
      </div>
      <h2 className={`text-base sm:text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {isArabic ? 'ملخص الطلب' : 'Order Summary'}
      </h2>
    </div>
  );
}
