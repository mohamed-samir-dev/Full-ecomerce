
import {SizeSelectorProps}from '../../types/types'
export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 text-gray-700 uppercase tracking-wider">Select Size</h3>
      <div className="flex flex-wrap gap-2 max-h-[5rem] overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-5 py-2.5 border-2 rounded-full text-sm font-medium transition-all ${
              selectedSize === size 
                ? 'border-[#B39E7A] bg-[#B39E7A] text-white shadow-md' 
                : 'border-gray-200 text-gray-700 hover:border-[#B39E7A] hover:bg-amber-50'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
