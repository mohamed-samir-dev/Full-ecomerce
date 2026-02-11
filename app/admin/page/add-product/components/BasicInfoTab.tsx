import { ProductFormData } from '../types/product';

interface BasicInfoTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function BasicInfoTab({ formData, isDarkMode, isArabic, onChange }: BasicInfoTabProps) {
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{isArabic ? 'اسم المنتج (إنجليزي) *' : 'Product Name (English) *'}</label>
          <input name="name" value={formData.name} onChange={onChange} placeholder="Enter product name" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'اسم المنتج (عربي) *' : 'Product Name (Arabic) *'}</label>
          <input name="nameAr" value={formData.nameAr} onChange={onChange} placeholder="أدخل اسم المنتج" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'الرابط *' : 'Slug *'}</label>
          <input name="slug" value={formData.slug} onChange={onChange} placeholder="product-slug" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'رمز المنتج *' : 'SKU *'}</label>
          <input name="sku" value={formData.sku} onChange={onChange} placeholder="SKU-12345" className={inputClass} required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{isArabic ? 'وصف مختصر (إنجليزي) *' : 'Short Description (English) *'}</label>
          <textarea name="shortDescription" value={formData.shortDescription} onChange={onChange} placeholder="Brief description" className={inputClass + " h-20 resize-none"} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'وصف مختصر (عربي) *' : 'Short Description (Arabic) *'}</label>
          <textarea name="shortDescriptionAr" value={formData.shortDescriptionAr} onChange={onChange} placeholder="وصف مختصر" className={inputClass + " h-20 resize-none"} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'وصف كامل (إنجليزي) *' : 'Full Description (English) *'}</label>
          <textarea name="description" value={formData.description} onChange={onChange} placeholder="Detailed description" className={inputClass + " h-24 resize-none"} required />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'وصف كامل (عربي) *' : 'Full Description (Arabic) *'}</label>
          <textarea name="descriptionAr" value={formData.descriptionAr} onChange={onChange} placeholder="وصف تفصيلي" className={inputClass + " h-24 resize-none"} required />
        </div>
      </div>
    </div>
  );
}
