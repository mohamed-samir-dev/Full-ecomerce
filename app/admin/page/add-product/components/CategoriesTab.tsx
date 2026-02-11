import { ProductFormData, ArrayFieldType } from '../types/product';

interface CategoriesTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}

export default function CategoriesTab({ formData, isDarkMode, isArabic, onChange, onArrayChange, onAddArrayItem, onRemoveArrayItem }: CategoriesTabProps) {
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category (EN) *</label>
          <input name="category" value={formData.category} onChange={onChange} placeholder="Electronics" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Category (AR) *</label>
          <input name="categoryAr" value={formData.categoryAr} onChange={onChange} placeholder="إلكترونيات" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Sub Category (EN)</label>
          <input name="subCategory" value={formData.subCategory} onChange={onChange} placeholder="Smartphones" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sub Category (AR)</label>
          <input name="subCategoryAr" value={formData.subCategoryAr} onChange={onChange} placeholder="هواتف ذكية" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'العلامة التجارية (إنجليزي) *' : 'Brand (EN) *'}</label>
          <input name="brand" value={formData.brand} onChange={onChange} placeholder="Apple" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'العلامة التجارية (عربي) *' : 'Brand (AR) *'}</label>
          <input name="brandAr" value={formData.brandAr} onChange={onChange} placeholder="أبل" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'نوع المنتج (إنجليزي)' : 'Product Type (EN)'}</label>
          <input name="productType" value={formData.productType} onChange={onChange} placeholder="Type" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'النوع الثاني (إنجليزي)' : 'Second Type (EN)'}</label>
          <input name="secondtype" value={formData.secondtype} onChange={onChange} placeholder="Second Type" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'النوع الثاني (عربي)' : 'Second Type (AR)'}</label>
          <input name="secondtypeAr" value={formData.secondtypeAr} onChange={onChange} placeholder="النوع الثاني" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'النوع الثالث (إنجليزي)' : 'Third Type (EN)'}</label>
          <input name="thirdtype" value={formData.thirdtype} onChange={onChange} placeholder="Third Type" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'النوع الثالث (عربي)' : 'Third Type (AR)'}</label>
          <input name="thirdtypeAr" value={formData.thirdtypeAr} onChange={onChange} placeholder="النوع الثالث" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tags (EN)</label>
          {formData.tags.map((tag, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={tag} onChange={(e) => onArrayChange('tags', i, e.target.value)} placeholder="Tag" className={inputClass} />
              <button type="button" onClick={() => onRemoveArrayItem('tags', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => onAddArrayItem('tags')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {isArabic ? '+ إضافة وسم' : '+ Add Tag'}
          </button>
        </div>
        <div>
          <label className={labelClass}>Tags (AR)</label>
          {formData.tagsAr.map((tag, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={tag} onChange={(e) => onArrayChange('tagsAr', i, e.target.value)} placeholder="وسم" className={inputClass} />
              <button type="button" onClick={() => onRemoveArrayItem('tagsAr', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => onAddArrayItem('tagsAr')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {isArabic ? '+ إضافة وسم' : '+ Add Tag'}
          </button>
        </div>
      </div>
    </div>
  );
}
