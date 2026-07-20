import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import OrderStatusBadge from '../ui/OrderStatusBadge';
import { OrderHeaderProps } from '../../types/types';

export default function OrderHeader({ orderId, statusConfig, isDarkMode, isArabic }: OrderHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
      <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <ShoppingBagIcon className="w-4 h-4 text-white" />
        </div>
        <div className={isArabic ? 'text-right' : ''}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('orders.orderId')}
          </p>
          <p className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            #{orderId.slice(-8).toUpperCase()}
          </p>
        </div>
      </div>
      <OrderStatusBadge statusConfig={statusConfig} />
    </div>
  );
}
