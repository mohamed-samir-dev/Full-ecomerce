export interface Review {
  _id: string;
  userId?: { _id: string; name: string };
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  productId?: string;
  productName?: string;
  productImage?: string;
}

export interface Product {
  _id: string;
  name: string;
  mainImage: string;
  reviews: Review[];
}

export interface ReviewStats {
  total: number;
  approved: number;
  pending: number;
  rating5: number;
  rating4: number;
  rating3: number;
  avgRating: string;
}


export interface ReviewCardProps {
  review: Review;
  isDarkMode: boolean;
  isArabic: boolean;
  onToggleApproval: (productId: string, reviewId: string, approved: boolean) => void;
  onViewDetails: (review: Review) => void;
}


export interface ReviewModalProps {
  review: Review;
  isDarkMode: boolean;
  isArabic: boolean;
  onClose: () => void;
  onToggleApproval: (productId: string, reviewId: string, approved: boolean) => void;
  onDelete: (productId: string, reviewId: string) => void;
}