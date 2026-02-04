
import {SizeSelectorProps}from '../../types/types'
export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-gray-900">Size</h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              selectedSize === size ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
