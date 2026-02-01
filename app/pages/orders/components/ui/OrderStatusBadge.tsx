import React from 'react';

interface OrderStatusBadgeProps {
  statusConfig: { color: string; icon: React.ReactElement; label: string };
}

export default function OrderStatusBadge({ statusConfig }: OrderStatusBadgeProps) {
  return (
    <span className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-2 ${statusConfig.color}`}>
      {statusConfig.icon}
      {statusConfig.label}
    </span>
  );
}
