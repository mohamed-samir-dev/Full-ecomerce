import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import {EmptyStateProps}from '../../types/types'


export default function EmptyState({ statusFilter, isDarkMode, isArabic }: EmptyStateProps) {
  return (
    <div className={`text-center py-8 sm:py-12 md:py-16 rounded-lg sm:rounded-xl border-2 border-dashed ${
      isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-300 bg-white'
    }`}>
      <ClipboardDocumentListIcon className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 ${
        isDarkMode ? 'text-slate-600' : 'text-slate-400'
      }`} />
      <h3 className={`text-lg sm:text-xl font-semibold mb-2 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {isArabic ? 'لا توجد طلبات' : 'No Orders Found'}
      </h3>
      <p className={`text-sm sm:text-base px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        {statusFilter === 'all' 
          ? (isArabic ? 'لم تقم بأي طلبات بعد' : "You haven't placed any orders yet")
          : (isArabic ? 'لا توجد طلبات بهذه الحالة' : 'No orders with this status')}
      </p>
    </div>
  );
}
