import { useTranslation } from '@/i18n';
import { PriceSummaryProps } from '../../types/types';

export default function PriceSummary({ subtotal, totalPrice, isDarkMode, isArabic }: PriceSummaryProps) {
  const { t } = useTranslation();
  const shipping = subtotal >= 15000 ? 0 : 15;
  const tax = subtotal * 0.05;

  const rows = [
    { label: t('orders.subtotal'), value: `$${subtotal.toFixed(2)}` },
    { label: t('orders.shipping'), value: shipping === 0 ? (isArabic ? 'مجاني' : 'Free') : `$${shipping.toFixed(2)}`, free: shipping === 0 },
    { label: `${t('orders.tax')} (5%)`, value: `$${tax.toFixed(2)}` },
  ];

  return (
    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'}`}>
      <h4 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isArabic ? 'text-right' : ''}`}>
        {t('orders.priceSummary')}
      </h4>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className={`flex justify-between items-center text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{row.label}</span>
            <span
              className={row.free ? 'font-medium' : (isDarkMode ? 'text-white' : 'text-gray-900')}
              style={row.free ? { color: '#C9A84C' } : {}}
            >
              {row.value}
            </span>
          </div>
        ))}
        <div className={`pt-2 border-t flex justify-between items-center ${isDarkMode ? 'border-white/5' : 'border-black/5'} ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('orders.total')}</span>
          <span className="text-lg font-bold" style={{ color: '#C9A84C' }}>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
