export type ArrayFieldType = 'imageGallery' | 'tags' | 'tagsAr' | 'sizes' | 'colors';

export interface ProductFormData {
  name: string;
  nameAr: string;
  slug: string;
  shortDescription: string;
  shortDescriptionAr: string;
  description: string;
  descriptionAr: string;
  basePrice: string;
  discount: { type: string; value: number };
  currency: string;
  mainImage: string;
  imageGallery: string[];
  video: string;
  stock: string;
  sku: string;
  availability: string;
  category: string;
  categoryAr: string;
  subCategory: string;
  subCategoryAr: string;
  brand: string;
  brandAr: string;
  productType: string;
  secondtype: string;
  secondtypeAr: string;
  thirdtype: string;
  thirdtypeAr: string;
  tags: string[];
  tagsAr: string[];
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  material: string;
  weight: string;
  dimensions: { length: string; width: string; height: string };
  warranty: string;
  returnPolicy: string;
  specifications: string;
  specificationsAr: string;
  shop: string;
  isExclusive: boolean;
  toplay: boolean;
  initialReview: { rating: number; comment: string };
}

export interface BasicInfoTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export interface CategoriesTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}
export interface DetailsTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDimensionChange: (field: 'length' | 'width' | 'height', value: string) => void;
  onRatingChange: (rating: number) => void;
  onReviewCommentChange: (comment: string) => void;
}

export interface FormNavigationProps {
  activeTab: number;
  totalTabs: number;
  loading: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

export interface MediaTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}

export interface PricingTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDiscountChange: (field: 'type' | 'value', value: string | number) => void;
  onCheckboxChange: (field: 'isExclusive' | 'toplay', value: boolean) => void;
}

export interface VariantsTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
  onColorChange: (index: number, field: 'name' | 'hex', value: string) => void;
}