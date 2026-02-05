// CustomerSay
export interface Testimonial {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}
export interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export interface FormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}
// FeaturedProductCard
export interface FeaturedProductCardProps {
  product: {
    _id: string;
    name: string;
    nameAr: string;
    finalPrice: number;
    basePrice: number;
    mainImage: string;
    stock: number;
  };
}
export interface Product {
  _id: string;
  name: string;
  nameAr: string;
  finalPrice: number;
  basePrice: number;
  mainImage: string;
  stock: number;
}
// HeroSection
export interface HeroSlide {
  titleKey: string;
  descriptionKey: string;
  image: string;
  buttonTextKey: string;
  buttonLink: string;
}

export interface BackgroundImageProps {
  slide: HeroSlide;
  currentSlide: number;
  altText: string;
}
export interface HeroContentProps {
  slide: HeroSlide;
  currentSlide: number;
  isDarkMode: boolean;
  isArabic: boolean;
  t: (key: string) => string | React.ReactNode;
}
export interface HeroImageProps {
  slide: HeroSlide;
  currentSlide: number;
  altText: string;
}
export interface NavigationIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}



export interface HeroSectionProps {
  slides: HeroSlide[];
}
// PromoSection
export interface PromoItem {
  id: number;
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
  imageUrl: string;
  imageAlt: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
  color: string;
}