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
  colors: { name: string; hex: string }[];
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

export interface Tab {
  id: number;
  name: string;
  icon: string;
}

export interface BasicInfoTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface CategoriesTabProps {
  formData: ProductFormData;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}
export interface DetailsTabProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface MediaTabProps {
  formData: { mainImage: string; imageGallery: string[]; video: string };
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}

export interface NavigationButtonsProps {
  activeTab: number;
  totalTabs: number;
  loading: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

export interface PricingTabProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface VariantsTabProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  isDarkMode: boolean;
  isArabic: boolean;
  inputClass: string;
  labelClass: string;
  onArrayChange: (field: ArrayFieldType, index: number, value: string) => void;
  onAddArrayItem: (field: ArrayFieldType) => void;
  onRemoveArrayItem: (field: ArrayFieldType, index: number) => void;
}