import { Minus, Plus } from 'lucide-react';
import {QuantitySelectorProps}from '../../types/types'


export default function QuantitySelector({ quantity, maxStock, onQuantityChange }: QuantitySelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2 sm:mb-3 text-black">Quantity</h3>
      <div className="inline-flex items-center rounded-lg p-1 bg-gray-50">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-black hover:bg-white"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center text-black font-semibold">
          {quantity}
        </div>
        <button
          onClick={() => onQuantityChange(Math.min(maxStock, quantity + 1))}
          disabled={quantity >= maxStock}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-black hover:bg-white disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
