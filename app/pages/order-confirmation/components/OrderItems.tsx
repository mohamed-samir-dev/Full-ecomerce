import { motion } from 'framer-motion';
import { DocumentTextIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { OrderItemsProps } from '../types/types';
import { useTranslation } from '@/i18n';
import Image from 'next/image';

export default function OrderItems({ products, isPrivateView, isDarkMode }: OrderItemsProps) {
  const { t, locale } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className={`rounded-2xl border p-6 transition-all ${
        isDarkMode
          ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/20'
          : 'bg-white border-black/5 hover:border-[#C9A84C]/20'
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <ShoppingBagIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orderConfirmation.orderItems')} ({products.length})
        </h3>
      </div>
      <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />
      <div className="space-y-4">
        {products.map((item, index) => (
          <div
            key={index}
            className={`flex gap-4 pb-4 ${index !== products.length - 1 ? 'border-b' : ''} ${
              isDarkMode ? 'border-white/5' : 'border-black/5'
            }`}
          >
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${
              isDarkMode ? 'bg-white/5' : 'bg-gray-100'
            }`}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={locale === 'ar' && item.nameAr ? item.nameAr : item.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <DocumentTextIcon className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-sm mb-1 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {isPrivateView ? '••••••••••••••' : (locale === 'ar' && item.nameAr ? item.nameAr : item.name)}
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('orderConfirmation.quantity')}: {item.quantity}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('orderConfirmation.unitPrice')}: {isPrivateView ? '••••' : `$${item.price.toFixed(2)}`}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-sm" style={{ color: '#C9A84C' }}>
                {isPrivateView ? '••••' : `$${(item.price * item.quantity).toFixed(2)}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
