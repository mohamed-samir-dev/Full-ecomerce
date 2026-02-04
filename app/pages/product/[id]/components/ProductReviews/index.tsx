import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ProductReviewsProps } from '../../types/types';
import { useReviews, useAuth } from '../../hooks/useReviews';
import { calculateAverageRating, calculateRatingCounts } from '../../utils/reviewHelpers';
import ReviewSummary from './ReviewSummary';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import LoginModal from './LoginModal';

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { reviews, loading } = useReviews(product._id);
  const { isLoggedIn } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const averageRating = calculateAverageRating(reviews);
  const totalReviews = reviews.length;
  const ratingCounts = calculateRatingCounts(reviews);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <Toaster position="top-center" />
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Customer Reviews</h3>

      {loading ? (
        <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">There isn&rsquo;t one</div>
      ) : (
        <>
          <ReviewSummary 
            averageRating={averageRating}
            totalReviews={totalReviews}
            ratingCounts={ratingCounts}
            reviews={reviews}
          />
          <ReviewList reviews={reviews} />
        </>
      )}

      {!showForm ? (
        <button 
          onClick={() => {
            if (!isLoggedIn) {
              setShowLoginModal(true);
              return;
            }
            setShowForm(true);
          }}
          className="w-full mt-4 sm:mt-6 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Write a Review
        </button>
      ) : (
        <ReviewForm productId={product._id} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
}
