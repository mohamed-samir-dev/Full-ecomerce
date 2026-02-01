'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { getStatusConfig } from '../../utils/orderHelpers';
import OrderHeader from './OrderHeader';
import OrderSummaryGrid from './OrderSummaryGrid';
import OrderDetails from './OrderDetails';
import {OrderCardProps}from '../../types/types'


export default function OrderCard({ order, isDarkMode, isArabic }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = getStatusConfig(order.status);
  const subtotal = order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = order.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 overflow-hidden transition-all shadow-lg hover:shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    }`}>
      <div className={`p-4 sm:p-6 md:p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
        <OrderHeader orderId={order._id} statusConfig={statusConfig} isDarkMode={isDarkMode} isArabic={isArabic} />
        <OrderSummaryGrid 
          createdAt={order.createdAt} 
          itemCount={itemCount} 
          productCount={order.products.length}
          totalPrice={order.totalPrice}
          isDarkMode={isDarkMode} 
          isArabic={isArabic} 
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          <span>{isExpanded ? (isArabic ? 'إخفاء التفاصيل' : 'Hide Details') : (isArabic ? 'عرض التفاصيل الكاملة' : 'View Full Details')}</span>
          <ChevronDownIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isExpanded && <OrderDetails order={order} subtotal={subtotal} isDarkMode={isDarkMode} isArabic={isArabic} />}
    </div>
  );
}
