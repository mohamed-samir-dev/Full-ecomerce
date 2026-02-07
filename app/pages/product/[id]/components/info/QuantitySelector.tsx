import { Minus, Plus } from 'lucide-react';
import {QuantitySelectorProps}from '../../types/types'
import { useLanguage } from '@/context/LanguageContext';

export default function QuantitySelector({ quantity, maxStock, onQuantityChange }: QuantitySelectorProps) {
  const { isArabic } = useLanguage();
  
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 text-gray-700 uppercase tracking-wider">{isArabic ? 'الكمية' : 'Quantity'}</h3>
      <div className="inline-flex items-center rounded-full border-2 border-gray-200 bg-white">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-16 h-12 flex items-center justify-center text-base text-gray-900 font-medium">
          {quantity}
        </div>
        <button
          onClick={() => onQuantityChange(Math.min(maxStock, quantity + 1))}
          disabled={quantity >= maxStock}
          className="w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
