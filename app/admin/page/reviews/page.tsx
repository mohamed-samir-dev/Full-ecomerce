'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useReviews } from './hooks/useReviews';
import { calculateStats, filterReviews } from './utils/reviewHelpers';
import { StatsCards } from './components/StatsCards';
import { SearchFilterBar } from './components/SearchFilterBar';
import { ReviewCard } from './components/ReviewCard';
import { ReviewModal } from './components/ReviewModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { reviewsStyles } from './styles/animations';
import { Review } from './types';

export default function ReviewsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const { reviews, loading, toggleApproval, deleteReview } = useReviews();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = filterReviews(reviews, statusFilter, searchTerm);
  const stats = calculateStats(reviews);

  const handleToggleApproval = async (productId: string, reviewId: string, approved: boolean) => {
    const newStatus = await toggleApproval(productId, reviewId, approved);
    if (selectedReview?._id === reviewId && newStatus !== undefined) {
      setSelectedReview({ ...selectedReview, approved: newStatus });
    }
  };

  const handleDelete = async (productId: string, reviewId: string) => {
    const success = await deleteReview(productId, reviewId, isArabic);
    if (success) {
      setSelectedReview(null);
    }
  };

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradilinearent-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
            {isArabic ? 'تقييمات المنتجات' : 'Product Reviews'}
          </h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isArabic ? 'إدارة وموافقة على تقييمات المنتجات' : 'Manage and approve product reviews'}
          </p>
        </div>

        <StatsCards stats={stats} isDarkMode={isDarkMode} isArabic={isArabic} />

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
        />

        {loading ? (
          <LoadingSpinner isDarkMode={isDarkMode} />
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 reviews-scrollbar">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                onToggleApproval={handleToggleApproval}
                onViewDetails={setSelectedReview}
              />
            ))}
          </div>
        )}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onClose={() => setSelectedReview(null)}
          onToggleApproval={handleToggleApproval}
          onDelete={handleDelete}
        />
      )}

      <style jsx>{reviewsStyles}</style>
    </div>
  );
}
