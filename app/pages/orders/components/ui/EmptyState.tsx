import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import {EmptyStateProps}from '../../types/types'


export default function EmptyState({ statusFilter, isDarkMode, isArabic }: EmptyStateProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`text-center py-8 sm:py-12 md:py-16 rounded-lg sm:rounded-xl border-2 border-dashed ${
      isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-300 bg-white'
    }`}>
      <ClipboardDocumentListIcon className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 ${
        isDarkMode ? 'text-slate-600' : 'text-slate-400'
      }`} />
      <h3 className={`text-lg sm:text-xl font-semibold mb-2 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {t('orders.empty.title')}
      </h3>
      <p className={`text-sm sm:text-base px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        {statusFilter === 'all' ? t('orders.empty.noOrders') : t('orders.empty.noStatus')}
      </p>
    </div>
  );
}
