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
