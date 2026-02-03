export interface Product {
  _id: string;
  name: string;
  nameAr: string;
  mainImage: string;
  basePrice: number;
  finalPrice: number;
  stock: number;
  category: string;
  brand: string;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
}
export interface ProductSliderProps {
  title: string;
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Omit<Product, 'availability'>) => void;
}
export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Omit<Product, 'availability'>) => void;
}