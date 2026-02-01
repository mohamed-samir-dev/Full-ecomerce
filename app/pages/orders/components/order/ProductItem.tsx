
import{ProductItemProps}from '../../types/types'
export default function ProductItem({ item, isDarkMode, isArabic }: ProductItemProps) {
  return (
    <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`flex justify-between items-start gap-3 sm:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className={`text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {item.name}
          </p>
          <div className={`flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
              {isArabic ? 'الكمية' : 'Qty'}: {item.quantity}
            </span>
            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
              {isArabic ? 'السعر' : 'Price'}: ${item.price.toFixed(2)}
            </span>
            {item.selectedOptions?.size && (
              <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                {isArabic ? 'المقاس' : 'Size'}: {item.selectedOptions.size}
              </span>
            )}
            {item.selectedOptions?.color && (
              <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                {isArabic ? 'اللون' : 'Color'}: {item.selectedOptions.color}
              </span>
            )}
          </div>
        </div>
        <div className={`text-right ${isArabic ? 'text-left' : ''}`}>
          <p className={`text-[10px] sm:text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {isArabic ? 'المجموع' : 'Subtotal'}
          </p>
          <p className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
