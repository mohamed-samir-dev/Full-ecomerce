import { ContactStats } from '../types';

interface StatsCardsProps {
  stats: ContactStats;
  isDarkMode: boolean;
  isArabic: boolean;
}

export const StatsCards = ({ stats, isDarkMode, isArabic }: StatsCardsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div className={`rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{stats.total}</div>
      <div className={`text-xs mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي الرسائل' : 'Total Messages'}</div>
    </div>
    <div className="bg-linear-to-br from-amber-400 to-orange-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="text-3xl font-bold text-white">{stats.pending}</div>
      <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'قيد الانتظار' : 'Pending'}</div>
    </div>
    <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="text-3xl font-bold text-white">{stats.read}</div>
      <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'مقروءة' : 'Read'}</div>
    </div>
    <div className="bg-linear-to-br from-green-400 to-green-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="text-3xl font-bold text-white">{stats.replied}</div>
      <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'تم الرد' : 'Replied'}</div>
    </div>
  </div>
);
