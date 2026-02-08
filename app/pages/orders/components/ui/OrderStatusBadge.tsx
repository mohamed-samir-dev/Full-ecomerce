import React from 'react';
import { useTranslation } from '@/i18n';

interface OrderStatusBadgeProps {
  statusConfig: { color: string; icon: React.ReactElement; labelKey: string };
}

export default function OrderStatusBadge({ statusConfig }: OrderStatusBadgeProps) {
  const { t } = useTranslation();
  
  return (
    <span className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-2 ${statusConfig.color}`}>
      {statusConfig.icon}
      {t(statusConfig.labelKey)}
    </span>
  );
}
