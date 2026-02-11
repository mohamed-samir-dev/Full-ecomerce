import { CustomerSay } from '../types';
import { StarRating } from './StarRating';
import { getApprovalStyle } from '../utils/styles';

interface TestimonialModalProps {
  testimonial: CustomerSay;
  isDarkMode: boolean;
  isArabic: boolean;
  onClose: () => void;
  onToggleApproval: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export const TestimonialModal = ({ testimonial, isDarkMode, isArabic, onClose, onToggleApproval, onDelete }: TestimonialModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <div className={`p-8 text-white ${getApprovalStyle(testimonial.isApproved)}`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">{isArabic ? 'تفاصيل التقييم' : 'Review Details'}</h2>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-lg ${testimonial.isApproved ? 'bg-white/20' : 'bg-black/20'}`}>
                  {testimonial.isApproved ? (isArabic ? '✓ معتمد' : '✓ Approved') : (isArabic ? '⏳ قيد المراجعة' : '⏳ Pending')}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-xl p-3 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className={`overflow-y-auto max-h-[calc(90vh-180px)] p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
          <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'معلومات العميل' : 'Customer Info'}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التقييم:' : 'Rating:'}</span>
                <div className="flex gap-1"><StarRating rating={testimonial.rating} /></div>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التاريخ:' : 'Date:'}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(testimonial.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}</span>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'التعليق' : 'Comment'}</h3>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.comment}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onToggleApproval(testimonial._id, testimonial.isApproved)}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                testimonial.isApproved 
                  ? 'bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white' 
                  : 'bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
              }`}
            >
              {testimonial.isApproved 
                ? (isArabic ? '✗ إلغاء الاعتماد' : '✗ Unapprove')
                : (isArabic ? '✓ اعتماد' : '✓ Approve')}
            </button>
            <button
              onClick={() => onDelete(testimonial._id)}
              className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              {isArabic ? '🗑️ حذف' : '🗑️ Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
