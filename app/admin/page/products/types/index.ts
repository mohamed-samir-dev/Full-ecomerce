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
  averageRating: number;
  totalReviews: number;
  availability: string;
  createdAt: string;
}




export interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface ProductCardProps {
  product: Product;
  isDarkMode: boolean;
  isArabic: boolean;
  onDelete: (id: string) => void;
  deleteLoading: string | null;
}

export interface ProductsFiltersProps {
  isDarkMode: boolean;
  isArabic: boolean;
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  setPage: (value: number) => void;
}