import { UserStats } from '../types';

interface StatsCardsProps {
  stats: UserStats;
  isDarkMode: boolean;
  isArabic: boolean;
}

export const StatsCards = ({ stats, isDarkMode, isArabic }: StatsCardsProps) => {
  const cardClass = `rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`;
  const labelClass = `text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelClass}>{isArabic ? 'إجمالي المستخدمين' : 'Total Users'}</p>
            <p className={`text-2xl sm:text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>👥</div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelClass}>{isArabic ? 'المسؤولين' : 'Admins'}</p>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1">{stats.admins}</p>
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>👑</div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelClass}>{isArabic ? 'المستخدمين العاديين' : 'Regular Users'}</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{stats.users}</p>
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>🙋</div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelClass}>{isArabic ? 'لديهم طلبات' : 'With Orders'}</p>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-1">{stats.withOrders}</p>
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'}`}>📦</div>
        </div>
      </div>
    </div>
  );
};
