import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { OrderSummaryProps } from '../types/checkout';
import OrderItem from './ordersummary/OrderItem';
import PriceDetails from './ordersummary/PriceDetails';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function OrderSummary({ items, itemCount, subtotal, shipping, tax, finalTotal, deliveryDateStr, isDarkMode }: OrderSummaryProps) {
  const { t, isArabic } = useTranslation();
  const safeItems = items || [];
  const safeItemCount = itemCount || 0;

  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
      <div
        className={`rounded-2xl border p-5 sticky top-4 transition-all ${
          isDarkMode
            ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/20'
            : 'bg-white border-black/5 hover:border-[#C9A84C]/20'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 mb-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            <Package className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('checkout.orderSummary')}
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {safeItemCount} {isArabic ? (safeItemCount === 1 ? 'منتج' : 'منتجات') : (safeItemCount === 1 ? 'item' : 'items')}
            </p>
          </div>
        </div>

        <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />

        {/* Items list */}
        {safeItems.length > 0 && (
          <div className="max-h-52 overflow-y-auto mb-1 pr-1 space-y-0">
            {safeItems.map((item, index) => (
              <OrderItem key={index} item={item} index={index} isDarkMode={isDarkMode} />
            ))}
          </div>
        )}

        <PriceDetails
          subtotal={subtotal || 0}
          shipping={shipping || 0}
          tax={tax || 0}
          finalTotal={finalTotal || 0}
          deliveryDateStr={deliveryDateStr}
          isDarkMode={isDarkMode}
        />
      </div>
    </motion.div>
  );
}
