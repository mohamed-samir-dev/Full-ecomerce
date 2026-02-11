
import {OrderSummaryProps}from '../types/types'
import { useTranslation } from '@/i18n';

export default function OrderSummary({ products, isPrivateView, isDarkMode }: OrderSummaryProps) {
  const { t } = useTranslation();
  
  // حساب الـ subtotal من أسعار الوحدات فقط (بدون ضرب في الكمية)
  const subtotal = products.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 15000 ? 0 : 15;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.orderSummary')}</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{t('orderConfirmation.subtotal')}</span>
          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
            ${isPrivateView ? '••••' : subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{t('orderConfirmation.shipping')}</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : (isDarkMode ? 'text-white' : 'text-slate-900')}>
            {isPrivateView ? '••••' : (shipping === 0 ? t('orderConfirmation.free') : `$${shipping.toFixed(2)}`)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{t('orderConfirmation.tax')}</span>
          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
            ${isPrivateView ? '••••' : tax.toFixed(2)}
          </span>
        </div>
        <div className={`border-t pt-3 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex justify-between">
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.total')}</span>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              ${isPrivateView ? '••••••' : total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
