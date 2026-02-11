import { ProductFormData, ArrayFieldType } from '../types/product.types';

interface VariantsTabProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}

export default function VariantsTab({ formData, setFormData, isDarkMode, isArabic, inputClass, labelClass, onArrayChange, onAddArrayItem, onRemoveArrayItem }: VariantsTabProps) {
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
              <input 
                value={color.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, colors: prev.colors.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c) }))} 
                placeholder="Color" 
                className={inputClass} 
              />
              <input 
                value={color.hex} 
                onChange={(e) => setFormData(prev => ({ ...prev, colors: prev.colors.map((c, idx) => idx === i ? { ...c, hex: e.target.value } : c) }))} 
                placeholder="#000" 
                className="w-24 px-3 py-2 border rounded-lg" 
              />
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
