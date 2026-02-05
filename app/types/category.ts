export interface Product {
  _id: string;
  name: string;
  nameAr?: string;
  mainImage: string;
  basePrice: number;
  finalPrice: number;
  stock: number;
  category?: string;
  brand?: string;
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order';
  averageRating: number;
  totalReviews: number;
  subCategory?: string;
  toplay?: boolean;
}
