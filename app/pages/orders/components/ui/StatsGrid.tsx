import { ShoppingBagIcon, ClockIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import StatCard from './StatCard';
import {StatsGridProps}from '../../types/types'

export default function StatsGrid({ stats, isDarkMode, isArabic }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
      <StatCard
        icon={<ShoppingBagIcon />}
        label={isArabic ? 'إجمالي الطلبات' : 'Total Orders'}
        value={stats.total}
        colorScheme="default"
        isDarkMode={isDarkMode}
      />
      <StatCard
        icon={<ClockIcon />}
        label={isArabic ? 'قيد المعالجة' : 'Processing'}
        value={stats.processing}
        colorScheme="orange"
        isDarkMode={isDarkMode}
      />
      <StatCard
        icon={<TruckIcon />}
        label={isArabic ? 'تم الشحن' : 'Shipped'}
        value={stats.shipped}
        colorScheme="blue"
        isDarkMode={isDarkMode}
      />
      <StatCard
        icon={<CheckCircleIcon />}
        label={isArabic ? 'تم التسليم' : 'Delivered'}
        value={stats.delivered}
        colorScheme="emerald"
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
