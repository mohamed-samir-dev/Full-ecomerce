'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { getStatusConfig } from '../../utils/orderHelpers';
import OrderHeader from './OrderHeader';
import OrderSummaryGrid from './OrderSummaryGrid';
import OrderDetails from './OrderDetails';
import { OrderCardProps } from '../../types/types';

export default function OrderCard({ order, isDarkMode, isArabic }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const statusConfig = getStatusConfig(order.status);
  const subtotal = order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = order.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      isDarkMode
        ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/20'
        : 'bg-white border-black/5 hover:border-[#C9A84C]/20'
    }`}>
      <div className={`p-5 sm:p-6 ${isArabic ? 'text-right' : 'text-left'}`}>
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
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all mt-4 ${
            isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>{isExpanded ? t('orders.hideDetails') : t('orders.viewDetails')}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <OrderDetails order={order} subtotal={subtotal} isDarkMode={isDarkMode} isArabic={isArabic} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
