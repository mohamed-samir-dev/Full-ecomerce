import { motion } from 'framer-motion';
import {OrderItemProps}from '../../types/checkout'
import { useTranslation } from '@/i18n/hooks/useTranslation';


export default function OrderItem({ item, index }: OrderItemProps) {
  const { t } = useTranslation();
  const itemPrice = item?.product?.finalPrice || item?.product?.basePrice || 0;
  const itemQuantity = item?.quantity || 0;
  const itemName = item?.product?.name || 'Unknown Product';
  
  return (
    <motion.div 
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex justify-between items-start pb-3 border-b border-gray-100"
    >
      <div className="flex-1">
        <p className="font-semibold text-sm text-gray-900">{itemName}</p>
        <p className="text-xs mt-1 text-gray-600">{t('checkout.qty')}: {itemQuantity}</p>
      </div>
      <span className="font-bold text-sm sm:text-base text-blue-600">
        ${(itemPrice * itemQuantity).toFixed(2)}
      </span>
    </motion.div>
  );
}
