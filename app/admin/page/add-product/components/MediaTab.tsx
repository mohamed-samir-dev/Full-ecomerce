import { MediaTabProps } from '../types/product';
export default function MediaTab({ formData, isDarkMode, isArabic, onChange, onArrayChange, onAddArrayItem, onRemoveArrayItem }: MediaTabProps) {
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

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
