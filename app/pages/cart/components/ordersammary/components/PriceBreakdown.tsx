import { TruckIcon } from '@heroicons/react/24/outline';
import { PriceBreakdownProps } from '../../../types/cart';

export default function PriceBreakdown({
  isDarkMode,
  isArabic,
  itemCount,
  itemsLength,
  subtotal,
  shipping,
  tax,
  finalTotal,
  deliveryDateStr,
}: PriceBreakdownProps) {
  const row = (label: React.ReactNode, value: React.ReactNode) => (
    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
      {label}
      {value}
    </div>
  );

  return (
    <div className="space-y-3">
      {row(
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {isArabic ? `المنتجات (${itemsLength})` : `Products (${itemsLength})`}
        </span>,
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {itemCount} {isArabic ? (itemCount === 1 ? 'قطعة' : 'قطع') : (itemCount === 1 ? 'unit' : 'units')}
        </span>
      )}

      {row(
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {isArabic ? 'المجموع الفرعي' : 'Subtotal'}
        </span>,
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {subtotal.toFixed(2)} {isArabic ? 'ج.م' : 'EGP'}
        </span>
      )}

      {row(
        <div className={`flex items-center gap-1.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isArabic ? 'الشحن' : 'Shipping'}
          </span>
          {shipping === 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium text-emerald-600 bg-emerald-50">
              {isArabic ? 'مجاني' : 'Free'}
            </span>
          )}
        </div>,
        <span className={`text-sm font-medium ${shipping === 0 ? 'text-emerald-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {shipping === 0 ? (isArabic ? 'مجاني' : 'Free') : `${shipping.toFixed(2)} ${isArabic ? 'ج.م' : 'EGP'}`}
        </span>
      )}

      {row(
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {isArabic ? 'الضريبة (5%)' : 'Tax (5%)'}
        </span>,
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {tax.toFixed(2)} {isArabic ? 'ج.م' : 'EGP'}
        </span>
      )}

      {/* Delivery */}
      <div
        className={`flex items-center justify-between p-3 rounded-xl ${isArabic ? 'flex-row-reverse' : ''}`}
        style={{ background: isDarkMode ? '#C9A84C10' : '#C9A84C08' }}
      >
        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <TruckIcon className="w-4 h-4" style={{ color: '#C9A84C' }} />
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isArabic ? 'التسليم المتوقع' : 'Est. Delivery'}
          </span>
        </div>
        <span className="text-xs font-semibold" style={{ color: '#C9A84C' }}>
          {deliveryDateStr}
        </span>
      </div>

      {/* Total */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }} />
      <div className={`flex justify-between items-center pt-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? 'الإجمالي' : 'Total'}
        </span>
        <span className="text-xl font-bold" style={{ color: '#C9A84C' }}>
          {finalTotal.toFixed(2)}
          <span className={`text-xs font-normal ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isArabic ? 'ج.م' : 'EGP'}
          </span>
        </span>
      </div>
    </div>
  );
}
