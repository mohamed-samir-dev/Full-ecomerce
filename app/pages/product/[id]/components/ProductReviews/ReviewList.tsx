import { Star } from 'lucide-react';
import { Review } from '../../types/types';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {reviews.slice(0, 2).map((review) => (
        <div key={review._id} className="min-w-[300px] border border-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{review.user.name}</span>
            <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-700">{review.comment}</p>
        </div>
      ))}
      {reviews.slice(2).map((review) => (
        <div key={review._id} className="min-w-[300px] border border-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{review.user.name}</span>
            <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
