import { motion } from 'framer-motion';
import { OrderItemProps } from '../../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function OrderItem({ item, index, isDarkMode }: OrderItemProps) {
  const { t, isArabic } = useTranslation();
  const itemPrice = item?.product?.finalPrice || item?.product?.basePrice || 0;
  const itemQuantity = item?.quantity || 0;
  const itemName = isArabic
    ? (item?.product?.nameAr || item?.product?.name || 'منتج غير معروف')
    : (item?.product?.name || 'Unknown Product');

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-start justify-between gap-3 py-3 border-b last:border-0 ${
        isDarkMode ? 'border-white/5' : 'border-gray-100'
      } ${isArabic ? 'flex-row-reverse' : ''}`}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {itemName}
        </p>
        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {t('checkout.qty')}: {itemQuantity}
        </p>
      </div>
      <span className="text-sm font-bold shrink-0" style={{ color: '#C9A84C' }}>
        {(itemPrice * itemQuantity).toFixed(2)} <span className="text-xs font-normal">{isArabic ? 'ج.م' : 'EGP'}</span>
      </span>
    </motion.div>
  );
}
