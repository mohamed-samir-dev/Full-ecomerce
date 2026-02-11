import { Activity } from 'lucide-react';
import { DashboardStats } from '../types/dashboard';

interface AvgOrderCardProps {
  stats: DashboardStats;
  isArabic: boolean;
}

export default function AvgOrderCard({ stats, isArabic }: AvgOrderCardProps) {
  return (
    <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h4 className="text-base sm:text-lg font-bold">
          {isArabic ? 'متوسط قيمة الطلب' : 'Avg Order Value'}
        </h4>
        <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold mb-2">{stats.avgOrderValue.toLocaleString()}</p>
      <p className="text-xs sm:text-sm opacity-90">{isArabic ? 'جنيه لكل طلب' : 'EGP per order'}</p>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
        <p className="text-xs sm:text-sm">
          {isArabic ? 'معدل الإكمال: ' : 'Completion Rate: '}
          <span className="font-bold">
            {stats.orders > 0 ? ((stats.completedOrders / stats.orders) * 100).toFixed(1) : 0}%
          </span>
        </p>
      </div>
    </div>
  );
}
