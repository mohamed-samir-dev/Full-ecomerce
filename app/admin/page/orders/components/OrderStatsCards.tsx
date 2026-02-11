import { OrderStats } from '../types';

interface OrderStatsCardsProps {
  stats: OrderStats;
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function OrderStatsCards({ stats, isDarkMode, isArabic }: OrderStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
      <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{stats.total}</div>
        <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي الطلبات' : 'Total Orders'}</div>
      </div>
      <div className="bg-linear-to-br from-amber-400 to-orange-500 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.pending}</div>
        <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'قيد الانتظار' : 'Pending'}</div>
      </div>
      <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.confirmed}</div>
        <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'مؤكدة' : 'Confirmed'}</div>
      </div>
      <div className="bg-linear-to-br from-purple-400 to-purple-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.shipped}</div>
        <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'قيد الشحن' : 'Shipped'}</div>
      </div>
      <div className="bg-linear-to-br from-green-400 to-green-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.delivered}</div>
        <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'تم التوصيل' : 'Delivered'}</div>
      </div>
      <div className="bg-linear-to-br from-red-400 to-red-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.cancelled}</div>
        <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'ملغاة' : 'Cancelled'}</div>
      </div>
      <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.revenue.toFixed(0)}</div>
        <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'الإيرادات (جنيه)' : 'Revenue (EGP)'}</div>
      </div>
    </div>
  );
}
