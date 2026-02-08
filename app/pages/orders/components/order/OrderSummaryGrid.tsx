import { CalendarIcon, ShoppingBagIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import {OrderSummaryGridProps}from '../../types/types'


export default function OrderSummaryGrid({ createdAt, itemCount, productCount, totalPrice, isDarkMode, isArabic }: OrderSummaryGridProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
      <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
        <div className={`flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <CalendarIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <p className={`text-[10px] sm:text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('orders.orderDate')}
          </p>
        </div>
        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {new Date(createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
        <div className={`flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <ShoppingBagIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <p className={`text-[10px] sm:text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('orders.items')}
          </p>
        </div>
        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {itemCount} {itemCount === 1 ? t('orders.item') : t('orders.items')}
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {productCount} {productCount === 1 ? t('orders.product') : t('orders.products')}
        </p>
      </div>
      <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-blue-900/20 border-2 border-blue-500/30' : 'bg-blue-50 border-2 border-blue-200'}`}>
        <div className={`flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <CurrencyDollarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
          <p className={`text-[10px] sm:text-xs font-semibold uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {t('orders.totalAmount')}
          </p>
        </div>
        <p className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
