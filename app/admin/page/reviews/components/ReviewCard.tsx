import { ReviewCardProps } from '../types';
import { StarRating } from './StarRating';
import { getApprovalStyle } from '../utils/reviewHelpers';


export const ReviewCard = ({ 
  review, 
  isDarkMode, 
  isArabic, 
  onToggleApproval, 
  onViewDetails 
}: ReviewCardProps) => {
  return (
    <div className={`backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-white/50'}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${getApprovalStyle(review.approved)} flex items-center justify-center shadow-lg`}>
            <span className="text-2xl font-bold text-white">{review.rating}</span>
          </div>
          <div>
            <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{review.userId?.name || 'User'}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{review.productName}</div>
            <div className="flex gap-1 mt-1"><StarRating rating={review.rating} /></div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-center">
            <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'التاريخ' : 'Date'}</div>
            <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(review.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</div>
          </div>
          <button
            onClick={() => onToggleApproval(review.productId!, review._id, review.approved)}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
              review.approved 
                ? 'bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white' 
                : 'bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white'
            }`}
          >
            {review.approved 
              ? (isArabic ? '✓ معتمد' : '✓ Approved')
              : (isArabic ? '⏳ اعتماد' : '⏳ Approve')}
          </button>
          <button
            onClick={() => onViewDetails(review)}
            className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isArabic ? 'عرض' : 'View'}
          </button>
        </div>
      </div>
    </div>
  );
};
