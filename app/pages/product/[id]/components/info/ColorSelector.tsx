import { Product } from '../../../../shop/types';
import { useLanguage } from '@/context/LanguageContext';
type Color = { name: string; hex: string };

interface ColorSelectorProps {
  colors: Product['colors'];
  selectedColor: Color | null;
  onColorChange: (color: Color) => void;
}

export default function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  const { isArabic } = useLanguage();
  
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-gray-900">
        {isArabic ? 'اللون: ' : 'Color: '}<span className="font-normal">{selectedColor?.name}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color)}
            aria-label={isArabic ? `اختر اللون ${color.name}` : `Select color ${color.name}`}
            aria-pressed={selectedColor?.name === color.name}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
              selectedColor?.name === color.name ? 'border-gray-900 ring-2 ring-gray-300' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}
