
import {ColorSelectorProps} from '../../types/types'
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <h3 className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
