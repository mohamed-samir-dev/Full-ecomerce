import { ReviewStats } from '../types';

interface StatsCardsProps {
  stats: ReviewStats;
  isDarkMode: boolean;
  isArabic: boolean;
}

export const StatsCards = ({ stats, isDarkMode, isArabic }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
      <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{stats.total}</div>
        <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي' : 'Total'}</div>
      </div>
      <div className="bg-linear-to-br from-green-400 to-green-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-3xl font-bold text-white">{stats.approved}</div>
        <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'معتمدة' : 'Approved'}</div>
      </div>
      <div className="bg-linear-to-br from-amber-400 to-orange-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-3xl font-bold text-white">{stats.pending}</div>
        <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'قيد المراجعة' : 'Pending'}</div>
      </div>
      <div className="bg-linear-to-br from-yellow-400 to-yellow-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-3xl font-bold text-white">{stats.avgRating}</div>
        <div className="text-xs text-white/90 mt-2 font-medium">{isArabic ? 'المتوسط' : 'Average'}</div>
      </div>
      <div className="bg-linear-to-br from-green-500 to-green-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-3xl font-bold text-white">{stats.rating5}</div>
        <div className="text-xs text-white/90 mt-2 font-medium">⭐⭐⭐⭐⭐</div>
      </div>
      <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-3xl font-bold text-white">{stats.rating4}</div>
        <div className="text-xs text-white/90 mt-2 font-medium">⭐⭐⭐⭐</div>
      </div>
      <div className="bg-linear-to-br from-purple-400 to-purple-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-3xl font-bold text-white">{stats.rating3}</div>
        <div className="text-xs text-white/90 mt-2 font-medium">⭐⭐⭐</div>
      </div>
    </div>
  );
};
