
import { Product } from '../../../shop/types';

// ImageModerl
export interface NavigationButtonsProps {
  currentIndex: number;
  totalImages: number;
  onPrevious: () => void;
  onNext: () => void;
}



export interface ImageModalProps {
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
  }
  
//   infoSection
export interface ActionButtonsProps {
  isOutOfStock: boolean;
  isWishlisted: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}
export interface PriceDisplayProps {
  finalPrice: number;
  basePrice: number;
  hasDiscount: boolean;
  discountPercentage: number;
}
export interface QuantitySelectorProps {
  quantity: number;
  maxStock: number;
  onQuantityChange: (quantity: number) => void;
}
export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}
export interface StockIndicatorProps {
  isOutOfStock: boolean;
  stock: number;
}

// ProductImage
export interface ProductImagesProps {
  product: Product;
}

export interface MainImageProps {
    currentImage: string;
    productName: string;
    isMainLoaded: boolean;
    onLoad: () => void;
    onZoomClick: () => void;
  }
  
  export interface ThumbnailGalleryProps {
    images: string[];
    activeIndex: number;
    productName: string;
    onThumbnailClick: (index: number) => void;
  }

//   ProductReview

export interface ProductReviewsProps {
  product: Product;
}

export interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  comment: string;
  createdAt: string;
}
