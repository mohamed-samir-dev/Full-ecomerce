import { DetailsTabProps } from '../types/product';
import StarRating from '../../../../components/StarRating';



export default function DetailsTab({ formData, isDarkMode, isArabic, onChange, onDimensionChange, onRatingChange, onReviewCommentChange }: DetailsTabProps) {
  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{isArabic ? 'الخامة' : 'Material'}</label>
          <input name="material" value={formData.material} onChange={onChange} placeholder="Cotton, Metal..." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'الوزن' : 'Weight'}</label>
          <input name="weight" value={formData.weight} onChange={onChange} placeholder="500g" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'الضمان' : 'Warranty'}</label>
          <input name="warranty" value={formData.warranty} onChange={onChange} placeholder="1 Year" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'سياسة الإرجاع' : 'Return Policy'}</label>
          <input name="returnPolicy" value={formData.returnPolicy} onChange={onChange} placeholder="30 Days" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>{isArabic ? 'الأبعاد' : 'Dimensions'}</label>
        <div className="grid grid-cols-3 gap-3">
          <input value={formData.dimensions.length} onChange={(e) => onDimensionChange('length', e.target.value)} placeholder="Length" className={inputClass} />
          <input value={formData.dimensions.width} onChange={(e) => onDimensionChange('width', e.target.value)} placeholder="Width" className={inputClass} />
          <input value={formData.dimensions.height} onChange={(e) => onDimensionChange('height', e.target.value)} placeholder="Height" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{isArabic ? 'المواصفات (إنجليزي)' : 'Specifications (EN)'}</label>
          <textarea name="specifications" value={formData.specifications} onChange={onChange} placeholder="Specifications..." className={inputClass + " h-24 resize-none"} />
        </div>
        <div>
          <label className={labelClass}>{isArabic ? 'المواصفات (عربي)' : 'Specifications (AR)'}</label>
          <textarea name="specificationsAr" value={formData.specificationsAr} onChange={onChange} placeholder="المواصفات..." className={inputClass + " h-24 resize-none"} />
        </div>
      </div>
      <div>
        <label className={labelClass}>{isArabic ? 'التقييم الأولي' : 'Initial Rating'}</label>
        <StarRating
          rating={formData.initialReview.rating}
          onRatingChange={onRatingChange}
          size="lg"
        />
        <textarea
          value={formData.initialReview.comment}
          onChange={(e) => onReviewCommentChange(e.target.value)}
          placeholder="Review comment..."
          className={inputClass + " h-20 resize-none mt-2"}
        />
      </div>
    </div>
  );
}
