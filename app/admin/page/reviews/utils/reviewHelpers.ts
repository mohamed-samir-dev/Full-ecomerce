import { Review, ReviewStats } from '../types';

export const calculateStats = (reviews: Review[]): ReviewStats => {
  return {
    total: reviews.length,
    approved: reviews.filter(r => r.approved).length,
    pending: reviews.filter(r => !r.approved).length,
    rating5: reviews.filter(r => r.rating === 5).length,
    rating4: reviews.filter(r => r.rating === 4).length,
    rating3: reviews.filter(r => r.rating === 3).length,
    avgRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0'
  };
};

export const filterReviews = (
  reviews: Review[], 
  statusFilter: string, 
  searchTerm: string
): Review[] => {
  return reviews.filter(review => {
    const matchesFilter = statusFilter === '' || 
      (statusFilter === 'approved' && review.approved) ||
      (statusFilter === 'pending' && !review.approved);
    const matchesSearch = review.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
};

export const getApprovalStyle = (approved: boolean): string => {
  return approved 
    ? 'bg-gradient-to-r from-green-400 to-green-600' 
    : 'bg-gradient-to-r from-amber-400 to-orange-500';
};
