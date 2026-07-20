import { useTranslation } from '@/i18n';
import { ProductItemProps } from '../../types/types';

export default function ProductItem({ item, isDarkMode, isArabic }: ProductItemProps) {
  const { t } = useTranslation();
  const productName = isArabic && item.nameAr ? item.nameAr : item.name;

  return (
    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'}`}>
      <div className={`flex justify-between items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
          <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {productName}
          </p>
          <div className={`flex flex-wrap gap-1.5 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className={`px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              {t('orders.quantity')}: {item.quantity}
            </span>
            <span className={`px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              {t('checkout.subtotal')}: ${item.price.toFixed(2)}
            </span>
            {item.selectedOptions?.size && (
              <span className={`px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                {t('shop.size')}: {item.selectedOptions.size}
              </span>
            )}
            {item.selectedOptions?.color && (
              <span className={`px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                {t('shop.color')}: {item.selectedOptions.color}
              </span>
            )}
          </div>
        </div>
        <div className={`text-right shrink-0 ${isArabic ? 'text-left' : ''}`}>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('orders.subtotal')}</p>
          <p className="text-base font-bold" style={{ color: '#C9A84C' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
