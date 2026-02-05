
import {SizeSelectorProps}from '../../types/types'
export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 text-gray-700 uppercase tracking-wider">Select Size</h3>
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide hover:scrollbar-default scroll-smooth">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-5 py-2.5 border-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
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
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hover\:scrollbar-default:hover::-webkit-scrollbar {
          display: block;
          height: 6px;
        }
        .hover\:scrollbar-default:hover::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .hover\:scrollbar-default:hover::-webkit-scrollbar-thumb {
          background: #B39E7A;
          border-radius: 10px;
        }
        .hover\:scrollbar-default:hover::-webkit-scrollbar-thumb:hover {
          background: #9a8566;
        }
      `}</style>
    </div>
  );
}
