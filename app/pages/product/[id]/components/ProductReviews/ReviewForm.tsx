import { Star } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

interface ReviewFormProps {
  productId: string;
  onCancel: () => void;
}

export default function ReviewForm({ productId, onCancel }: ReviewFormProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert(isArabic ? 'الرجاء اختيار تقييم' : 'Please select a rating');
    
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch(`https://backend-for-global-shop-production-a385.up.railway.app/api/products/${productId}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment })
      });
      
      if (response.ok) {
        toast.success(isArabic ? 'تم إرسال المراجعة! ستظهر بعد موافقة المسؤول.' : 'Review submitted! It will appear after admin approval.');
        setRating(0);
        setComment('');
        onCancel();
      } else {
        const error = await response.json();
        toast.error(error.message || (isArabic ? 'فشل إرسال المراجعة' : 'Failed to submit review'));
      }
    } catch (error) {
      toast.error(isArabic ? 'فشل إرسال المراجعة' : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-6 p-4 border rounded-lg ${
      isDarkMode ? 'bg-[#191C21] border-gray-700' : 'bg-gray-50 border-gray-200'
    }`}>
      <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{isArabic ? 'اكتب مراجعتك' : 'Write Your Review'}</h4>
      
      <div className="mb-3">
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{isArabic ? 'التقييم' : 'Rating'}</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`w-6 h-6 cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-3">
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{isArabic ? 'التعليق' : 'Comment'}</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={isArabic ? 'شارك تجربتك...' : 'Share your experience...'}
          className={`w-full border rounded px-3 py-2 h-20 ${
            isDarkMode ? 'bg-[#23272F] border-gray-700 text-gray-100' : 'text-gray-900 border-gray-300'
          }`}
          required
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? (isArabic ? 'جاري الإرسال...' : 'Submitting...') : (isArabic ? 'إرسال' : 'Submit')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded text-sm ${
            isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}>
          {isArabic ? 'إلغاء' : 'Cancel'}
        </button>
      </div>
    </form>
  );
}
