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
  categoryAr?: string;
  brand: string;
  brandAr?: string;
  averageRating: number;
  totalReviews: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  material?: string;
  shop: string;
  isExclusive?: boolean;
}

export interface Filters {
  category: string[];
  priceRange: [number, number];
  rating: string[];
  brand: string[];
  sizes: string[];
  colors: string[];
  availability: string[];
  material: string[];
  shop: string[];
  exclusiveOnly: boolean;
  sortBy: string;
  search: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  materials: string[];
  shops: string[];
  availability: string[];
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type FilterChangeHandler = (key: keyof Filters, value: Filters[keyof Filters]) => void;
export type ArrayFilterChangeHandler = (key: keyof Filters, value: string) => void;
