import { ShoppingBagIcon, ClockIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import StatCard from './StatCard';
import {StatsGridProps}from '../../types/types'

export default function StatsGrid({ stats, isDarkMode }: StatsGridProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
      <StatCard
        icon={<ShoppingBagIcon />}
        label={t('orders.stats.total')}
        value={stats.total}
        colorScheme="default"
        isDarkMode={isDarkMode}
      />
      <StatCard
        icon={<ClockIcon />}
        label={t('orders.stats.processing')}
        value={stats.processing}
        colorScheme="orange"
        isDarkMode={isDarkMode}
      />
      <StatCard
        icon={<TruckIcon />}
        label={t('orders.stats.shipped')}
        value={stats.shipped}
        colorScheme="blue"
        isDarkMode={isDarkMode}
      />
      <StatCard
        icon={<CheckCircleIcon />}
        label={t('orders.stats.delivered')}
        value={stats.delivered}
        colorScheme="emerald"
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
