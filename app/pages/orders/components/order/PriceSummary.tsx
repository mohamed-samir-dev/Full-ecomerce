
import { useTranslation } from '@/i18n';
import {PriceSummaryProps}from '../../types/types'

export default function PriceSummary({ subtotal, totalPrice, isDarkMode, isArabic }: PriceSummaryProps) {
  const { t } = useTranslation();
  const shipping = (totalPrice - subtotal) / 1.08;
  const tax = totalPrice - (totalPrice / 1.08);

  return (
    <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <h4 className={`text-xs sm:text-sm font-bold mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'} ${isArabic ? 'text-right' : 'text-left'}`}>
        {t('orders.priceSummary')}
      </h4>
      <div className="space-y-2">
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('orders.subtotal')}
          </span>
          <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('orders.shipping')}
          </span>
          <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${shipping.toFixed(2)}
          </span>
        </div>
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('orders.tax')} (8%)
          </span>
          <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${tax.toFixed(2)}
          </span>
        </div>
        <div className={`pt-2 mt-2 border-t-2 flex justify-between items-center ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {t('orders.total')}
          </span>
          <span className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
