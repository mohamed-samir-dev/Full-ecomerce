import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ProductReviewsProps } from '../../types/types';
import { useReviews, useAuth } from '../../hooks/useReviews';
import { calculateAverageRating, calculateRatingCounts } from '../../utils/reviewHelpers';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import ReviewSummary from './ReviewSummary';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import LoginModal from './LoginModal';

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  const { reviews, loading } = useReviews(product._id);
  const { isLoggedIn } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const averageRating = calculateAverageRating(reviews);
  const totalReviews = reviews.length;
  const ratingCounts = calculateRatingCounts(reviews);

  return (
    <div className={`rounded-xl border p-4 sm:p-6 ${
      isDarkMode ? 'bg-[#23272F] border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <Toaster position="top-center" />
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      
      <h3 className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{isArabic ? 'آراء العملاء' : 'Customer Reviews'}</h3>

      {loading ? (
        <div className={`text-center py-6 sm:py-8 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'جاري التحميل...' : 'Loading...'}</div>
      ) : reviews.length === 0 ? (
        <div className={`text-center py-6 sm:py-8 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'لا توجد مراجعات' : 'There isn\'t one'}</div>
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
          className={`w-full mt-4 sm:mt-6 py-2 sm:py-2.5 border rounded-lg text-xs sm:text-sm font-medium ${
            isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
          {isArabic ? 'اكتب مراجعة' : 'Write a Review'}
        </button>
      ) : (
        <ReviewForm productId={product._id} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
}
