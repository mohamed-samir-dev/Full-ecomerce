import { ProductFormData } from '../types/product';

export const initialFormData: ProductFormData = {
  name: '', nameAr: '', slug: '', shortDescription: '', shortDescriptionAr: '',
  description: '', descriptionAr: '', basePrice: '', discount: { type: 'percentage', value: 0 },
  currency: 'EGP', mainImage: '', imageGallery: [''], video: '', stock: '', sku: '',
  availability: 'in_stock', category: '', categoryAr: '', subCategory: '', subCategoryAr: '',
  brand: '', brandAr: '', productType: '', secondtype: '', secondtypeAr: '', thirdtype: '', thirdtypeAr: '',
  tags: [''], tagsAr: [''], sizes: [''], colors: [{ name: '', hex: '' }],
  material: '', weight: '', dimensions: { length: '', width: '', height: '' },
  warranty: '', returnPolicy: '', specifications: '', specificationsAr: '',
  shop: '', isExclusive: false, toplay: false,
  initialReview: { rating: 0, comment: '' }
};

export const getTabs = (isArabic: boolean) => [
  { id: 0, name: isArabic ? 'معلومات أساسية' : 'Basic Info', icon: '📝' },
  { id: 1, name: isArabic ? 'التسعير' : 'Pricing', icon: '💰' },
  { id: 2, name: isArabic ? 'الوسائط' : 'Media', icon: '🖼️' },
  { id: 3, name: isArabic ? 'التصنيفات' : 'Categories', icon: '📂' },
  { id: 4, name: isArabic ? 'المتغيرات' : 'Variants', icon: '🎨' },
  { id: 5, name: isArabic ? 'التفاصيل' : 'Details', icon: '📋' },
];
