import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import {OrderSummaryProps}from '../types/checkout'
import OrderItem from './ordersummary/OrderItem';
import PriceDetails from './ordersummary/PriceDetails';

export default function OrderSummary({ items, itemCount, subtotal, shipping, tax, finalTotal, deliveryDateStr }: OrderSummaryProps) {
  const safeSubtotal = subtotal || 0;
  const safeShipping = shipping || 0;
  const safeTax = tax || 0;
  const safeFinalTotal = finalTotal || 0;
  const safeItemCount = itemCount || 0;
  const safeItems = items || [];
  
  return (
    <motion.div 
      animate={{ opacity: 1, y: 0 }}
      className="lg:col-span-1"
    >
      <div className="rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border sticky top-4 bg-white border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center text-gray-900">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
          Order Summary
        </h3>
        
        <div className="flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Items ({safeItemCount})
          </span>
          <span className="text-xs sm:text-sm text-gray-600">
            {safeItems.length} {safeItems.length === 1 ? 'product' : 'products'}
          </span>
        </div>
        
        {safeItems && safeItems.length > 0 && (
          <div className="space-y-3 my-4 max-h-48 sm:max-h-64 overflow-y-auto">
            {safeItems.map((item, index) => (
              <OrderItem key={index} item={item} index={index} />
            ))}
          </div>
        )}
        
        <PriceDetails
          subtotal={safeSubtotal}
          shipping={safeShipping}
          tax={safeTax}
          finalTotal={safeFinalTotal}
          deliveryDateStr={deliveryDateStr}
        />
      </div>
    </motion.div>
  );
}
