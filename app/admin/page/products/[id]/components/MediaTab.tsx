import { MediaTabProps } from '../types/product.types';


export default function MediaTab({ formData, isDarkMode, isArabic, inputClass, labelClass, onChange, onArrayChange, onAddArrayItem, onRemoveArrayItem }: MediaTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>{isArabic ? 'رابط الصورة الرئيسية *' : 'Main Image URL *'}</label>
        <input name="mainImage" value={formData.mainImage} onChange={onChange} placeholder="https://example.com/image.jpg" className={inputClass} required />
      </div>
      <div>
        <label className={labelClass}>{isArabic ? 'معرض الصور' : 'Gallery Images'}</label>
        <div className="space-y-2">
          {formData.imageGallery.map((img, i) => (
            <div key={i} className="flex gap-2">
              <input value={img} onChange={(e) => onArrayChange('imageGallery', i, e.target.value)} placeholder={`Image URL ${i + 1}`} className={inputClass} />
              <button type="button" onClick={() => onRemoveArrayItem('imageGallery', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => onAddArrayItem('imageGallery')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {isArabic ? '+ إضافة صورة' : '+ Add Image'}
          </button>
        </div>
      </div>
      <div>
        <label className={labelClass}>{isArabic ? 'رابط الفيديو' : 'Video URL'}</label>
        <input name="video" value={formData.video} onChange={onChange} placeholder="https://youtube.com/..." className={inputClass} />
      </div>
    </div>
  );
}
