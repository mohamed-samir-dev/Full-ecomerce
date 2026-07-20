import { motion } from 'framer-motion';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { OrderSummaryProps } from '../types/types';
import { useTranslation } from '@/i18n';

export default function OrderSummary({ products, totalPrice, isPrivateView, isDarkMode }: OrderSummaryProps) {
  const { t } = useTranslation();

  const subtotal = products.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 15000 ? 0 : 15;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const rows = [
    { label: t('orderConfirmation.subtotal'), value: `$${subtotal.toFixed(2)}` },
    {
      label: t('orderConfirmation.shipping'),
      value: shipping === 0 ? t('orderConfirmation.free') : `$${shipping.toFixed(2)}`,
      free: shipping === 0,
    },
    { label: t('orderConfirmation.tax'), value: `$${tax.toFixed(2)}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
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
          <ReceiptPercentIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orderConfirmation.orderSummary')}
        </h3>
      </div>
      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{row.label}</span>
            <span
              className={row.free ? 'font-medium' : (isDarkMode ? 'text-white' : 'text-gray-900')}
              style={row.free ? { color: '#C9A84C' } : {}}
            >
              {isPrivateView ? '••••' : row.value}
            </span>
          </div>
        ))}
        <div className={`border-t pt-3 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex justify-between items-center">
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('orderConfirmation.total')}
            </span>
            <span className="text-xl font-bold" style={{ color: '#C9A84C' }}>
              {isPrivateView ? '••••••' : `$${total.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
