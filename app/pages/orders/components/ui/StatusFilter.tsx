import { FunnelIcon } from '@heroicons/react/24/outline';
import {StatusFilterProps}from '../../types/types'


export default function StatusFilter({ value, onChange, isDarkMode, isArabic }: StatusFilterProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <FunnelIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border-2 font-medium transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="all">{isArabic ? 'جميع الطلبات' : 'All Orders'}</option>
        <option value="processing">{isArabic ? 'قيد المعالجة' : 'Processing'}</option>
        <option value="shipped">{isArabic ? 'تم الشحن' : 'Shipped'}</option>
        <option value="delivered">{isArabic ? 'تم التسليم' : 'Delivered'}</option>
        <option value="cancelled">{isArabic ? 'ملغي' : 'Cancelled'}</option>
      </select>
    </div>
  );
}
