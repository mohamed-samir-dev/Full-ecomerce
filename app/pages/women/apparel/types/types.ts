export interface Product {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  finalPrice: number;
  basePrice: number;
  averageRating: number;
  totalReviews: number;
  availability: string;
  stock: number;
  subCategory?: string;
  category?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface FilterOptions {
  sizes: string[];
  colors: { name: string; hex: string }[];
  priceRange: { min: number; max: number };
}
