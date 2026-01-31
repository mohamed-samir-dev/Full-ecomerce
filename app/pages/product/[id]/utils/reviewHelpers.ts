import { Review } from '../types/types';

export const calculateAverageRating = (reviews: Review[]) => {
  return reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;
};

export const calculateRatingCounts = (reviews: Review[]) => {
  return [5, 4, 3, 2, 1].map(star => 
    reviews.filter(r => r.rating === star).length
  );
};
