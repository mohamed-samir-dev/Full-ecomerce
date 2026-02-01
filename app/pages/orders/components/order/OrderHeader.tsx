import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import OrderStatusBadge from '../ui/OrderStatusBadge';
import {OrderHeaderProps}from '../../types/types'


export default function OrderHeader({ orderId, statusConfig, isDarkMode, isArabic }: OrderHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
      <div className="flex-1">
        <div className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <ShoppingBagIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {isArabic ? 'رقم الطلب' : 'Order ID'}
            </p>
            <p className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              #{orderId.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <OrderStatusBadge statusConfig={statusConfig} />
    </div>
  );
}
