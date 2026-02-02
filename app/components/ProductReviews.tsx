'use client';

import { useState } from 'react';
import StarRating from './StarRating';

interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName?: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onReviewAdded?: (newReview: Review) => void;
}

export default function ProductReviews({ 
  productId, 
  reviews, 
  averageRating, 
  totalReviews, 
  onReviewAdded 
}: ProductReviewsProps) {
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newReview)
      });

      if (response.ok) {
        const data = await response.json();
        const addedReview = data.data[data.data.length - 1];
        onReviewAdded?.(addedReview);
        setNewReview({ rating: 0, comment: '' });
        setShowAddReview(false);
        alert('Review added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Write Review
        </button>
      </div>

      {/* Average Rating */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <StarRating rating={averageRating} readonly size="lg" />
          <div className="text-sm text-gray-600 mt-1">{totalReviews} reviews</div>
        </div>
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <form onSubmit={handleSubmitReview} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-3 text-gray-900">Add Your Review</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Rating</label>
            <StarRating
              rating={newReview.rating}
              onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
              size="lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your experience with this product..."
              className="w-full border rounded px-3 py-2 h-24 text-gray-900"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} readonly size="sm" />
                <span className="text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-800">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}