export interface Product {
  _id: string;
  name: string;
  nameAr: string;
  slug: string;
  shortDescription: string;
  description?: string;
  basePrice: number;
  finalPrice: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  mainImage: string;
  imageGallery?: string[];
  stock: number;
  sku: string;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  category: string;
  brand: string;
  averageRating: number;
  totalReviews: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  shop: string;
  isExclusive?: boolean;
}

export interface Filters {
  category: string[];
  priceRange: [number, number];
  rating: string[];
  brand: string[];
  shop: string[];
  exclusiveOnly: boolean;
  sortBy: string;
}

export type FilterChangeHandler = (key: keyof Filters, value: Filters[keyof Filters]) => void;
export type ArrayFilterChangeHandler = (key: keyof Filters, value: string) => void;
