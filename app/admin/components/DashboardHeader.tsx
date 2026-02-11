import { Activity } from 'lucide-react';

interface DashboardHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function DashboardHeader({ isDarkMode, isArabic }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
      <div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
        <p className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Activity className="w-4 h-4" />
          {isArabic ? 'التحليلات والرؤى في الوقت الفعلي' : 'Real-time analytics and insights'}
        </p>
      </div>
      <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {new Date().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}
