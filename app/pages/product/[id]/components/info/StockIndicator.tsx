import {StockIndicatorProps}from '../../types/types'
import { useLanguage } from '@/context/LanguageContext';

export default function StockIndicator({ isOutOfStock, stock }: StockIndicatorProps) {
  const { isArabic } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        isOutOfStock ? 'bg-red-500' : stock <= 10 ? 'bg-yellow-500' : 'bg-green-500'
      }`} />
      <span className={`text-xs sm:text-sm font-medium ${
        isOutOfStock ? 'text-red-600' : stock <= 10 ? 'text-yellow-600' : 'text-green-600'
      }`}>
        {isOutOfStock 
          ? (isArabic ? 'غير متوفر' : 'Out of Stock') 
          : stock <= 10 
            ? (isArabic ? `متبقي ${stock} فقط` : `Only ${stock} left`) 
            : (isArabic ? 'متوفر' : 'In Stock')
        }
      </span>
    </div>
  );
}
