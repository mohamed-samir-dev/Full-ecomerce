import { Minus, Plus } from 'lucide-react';
import {QuantitySelectorProps}from '../../types/types'
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function QuantitySelector({ quantity, maxStock, onQuantityChange }: QuantitySelectorProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  
  return (
    <div>
      <h3 className={`text-sm font-medium mb-3 uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{isArabic ? 'الكمية' : 'Quantity'}</h3>
      <div className={`inline-flex items-center rounded-full border-2 ${
        isDarkMode ? 'border-gray-600 bg-[#23272F]' : 'border-gray-200 bg-white'
      }`}>
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
          }`}>
          <Minus className="w-4 h-4" />
        </button>
        <div className={`w-16 h-12 flex items-center justify-center text-base font-medium ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {quantity}
        </div>
        <button
          onClick={() => onQuantityChange(Math.min(maxStock, quantity + 1))}
          disabled={quantity >= maxStock}
          className={`w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50 transition-colors ${
            isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
          }`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
