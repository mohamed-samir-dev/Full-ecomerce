import { Star } from 'lucide-react';
import { Review } from '../../types/types';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingCounts: number[];
  reviews: Review[];
}

export default function ReviewSummary({ averageRating, totalReviews, ratingCounts, reviews }: ReviewSummaryProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex items-center gap-4 mb-6 pb-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="text-center">
        <div className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{averageRating.toFixed(1)}</div>
        <div className="flex justify-center my-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{totalReviews} {isArabic ? 'مراجعة' : 'reviews'}</div>
      </div>

      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((star, idx) => (
          <div key={star} className="flex items-center gap-2">
            <span className={`text-xs w-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{star}</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-full bg-yellow-400" 
                style={{ width: `${reviews.length ? (ratingCounts[idx] / reviews.length) * 100 : 0}%` }}
              />
            </div>
            <span className={`text-xs w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{ratingCounts[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
