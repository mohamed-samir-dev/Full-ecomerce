import { FilterOptions } from "../types/types";

interface FiltersProps {
  filterOptions: FilterOptions;
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: [number, number];
  onSizeToggle: (size: string) => void;
  onColorToggle: (color: string) => void;
  onPriceChange: (value: number) => void;
}

export default function Filters({ filterOptions, selectedSizes, selectedColors, priceRange, onSizeToggle, onColorToggle, onPriceChange }: FiltersProps) {
  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-100">Refine</h2>

        {filterOptions.sizes?.length > 0 && (
          <div className="mb-8">
            <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Size</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => onSizeToggle(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSizes.includes(size)
                      ? 'bg-[#B39E7A] text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {filterOptions.colors?.length > 0 && (
          <div className="mb-8">
            <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Color</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => onColorToggle(color.name)}
                  className={`group relative w-10 h-10 rounded-full transition-all ${
                    selectedColors.includes(color.name) ? 'ring-2 ring-[#B39E7A] ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  title={color.name}
                >
                  <span className="absolute inset-0 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: color.hex }}></span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Price</h3>
          <input
            type="range"
            min={filterOptions.priceRange.min}
            max={filterOptions.priceRange.max}
            value={priceRange[1]}
            onChange={(e) => onPriceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B39E7A] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-sm font-medium text-gray-700 mt-3">
            <span className="bg-amber-50 px-3 py-1 rounded-full">{priceRange[0]} EGP</span>
            <span className="bg-amber-50 px-3 py-1 rounded-full">{priceRange[1]} EGP</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
