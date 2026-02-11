import { VariantsTabProps } from '../types/product';



export default function VariantsTab({ formData, isDarkMode, isArabic, onArrayChange, onAddArrayItem, onRemoveArrayItem, onColorChange }: VariantsTabProps) {
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>{isArabic ? 'المقاسات' : 'Sizes'}</label>
          {formData.sizes.map((size, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={size} onChange={(e) => onArrayChange('sizes', i, e.target.value)} placeholder="S, M, L" className={inputClass} />
              <button type="button" onClick={() => onRemoveArrayItem('sizes', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => onAddArrayItem('sizes')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {isArabic ? '+ إضافة مقاس' : '+ Add Size'}
          </button>
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'الألوان' : 'Colors'}</label>
          {formData.colors.map((color, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={color.name} onChange={(e) => onColorChange(i, 'name', e.target.value)} placeholder="Color" className={inputClass} />
              <input value={color.hex} onChange={(e) => onColorChange(i, 'hex', e.target.value)} placeholder="#000" className="w-24 px-3 py-2 border rounded-lg" />
              <button type="button" onClick={() => onRemoveArrayItem('colors', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => onAddArrayItem('colors')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {isArabic ? '+ إضافة لون' : '+ Add Color'}
          </button>
        </div>
      </div>
    </div>
  );
}
