import { Star } from 'lucide-react';
import { Review } from '../../types/types';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingCounts: number[];
  reviews: Review[];
}

export default function ReviewSummary({ averageRating, totalReviews, ratingCounts, reviews }: ReviewSummaryProps) {
  return (
    <div className="flex items-center gap-4 mb-6 pb-6 border-b">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
        <div className="flex justify-center my-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <div className="text-xs text-gray-500">{totalReviews} reviews</div>
      </div>

      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((star, idx) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-3">{star}</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400" 
                style={{ width: `${reviews.length ? (ratingCounts[idx] / reviews.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 w-6">{ratingCounts[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
