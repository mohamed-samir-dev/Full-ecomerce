import { TruckIcon } from '@heroicons/react/24/outline';
import {PriceBreakdownProps}from '../../../types/cart'

export default function PriceBreakdown({
  isDarkMode,
  isArabic,
  itemCount,
  itemsLength,
  subtotal,
  shipping,
  tax,
  finalTotal,
  deliveryDateStr
}: PriceBreakdownProps) {
  return (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      <div className={`flex justify-between items-center pb-2 sm:pb-2.5 md:pb-3 border-b ${
        isDarkMode ? 'border-slate-700' : 'border-slate-200'
      } ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {isArabic ? 'عدد المنتجات' : 'Items'} ({itemCount})
        </span>
        <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isArabic ? `${itemsLength} ${itemsLength === 1 ? 'منتج' : 'منتجات'}` : `${itemsLength} ${itemsLength === 1 ? 'product' : 'products'}`}
        </span>
      </div>
      
      <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isArabic ? 'المجموع الفرعي' : 'Subtotal'}
        </span>
        <span className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          ${subtotal.toFixed(2)}
        </span>
      </div>
      
      <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isArabic ? 'الشحن' : 'Shipping'}
          </span>
          {shipping === 0 && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
              {isArabic ? 'مؤهل' : 'Qualified'}
            </span>
          )}
        </div>
        <span className={`text-sm sm:text-base font-medium ${
          shipping === 0 ? 'text-emerald-600' : (isDarkMode ? 'text-white' : 'text-slate-900')
        }`}>
          {shipping === 0 ? (isArabic ? 'مجاني' : 'Free') : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      
      <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isArabic ? 'الضريبة' : 'Tax'} (5%)
        </span>
        <span className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          ${tax.toFixed(2)}
        </span>
      </div>
      
      <div className={`flex justify-between items-center py-2 sm:py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 rounded-lg ${isArabic ? 'flex-row-reverse' : ''} ${
        isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50'
      }`}>
        <div className={`flex items-center gap-1.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {isArabic ? 'التسليم المتوقع' : 'Est. Delivery'}
          </span>
        </div>
        <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          {deliveryDateStr}
        </span>
      </div>
      
      <div className={`border-t pt-2.5 sm:pt-3 md:pt-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-sm sm:text-base md:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isArabic ? 'المجموع' : 'Total'}
          </span>
          <span className={`text-base sm:text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${finalTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
