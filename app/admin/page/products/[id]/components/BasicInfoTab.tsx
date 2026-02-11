import { ProductFormData } from '../types/product.types';

interface BasicInfoTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function BasicInfoTab({ formData, isDarkMode, isArabic, inputClass, labelClass, onChange }: BasicInfoTabProps) {
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
