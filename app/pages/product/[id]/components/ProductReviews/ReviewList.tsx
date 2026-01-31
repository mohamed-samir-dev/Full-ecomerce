import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {reviews.map((review) => (
        <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0">
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
