import { ProductFormData } from '../types/product.types';

export const getInitialFormData = (): ProductFormData => ({
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
});

export const calculateFinalPrice = (basePrice: string, discount: { type: string; value: number }): number => {
  if (!basePrice) return 0;
  return discount.type === 'percentage'
    ? Number(basePrice) * (1 - discount.value / 100)
    : Number(basePrice) - discount.value;
};

export const prepareProductData = (formData: ProductFormData) => {
  const finalPrice = calculateFinalPrice(formData.basePrice, formData.discount);

  return {
    ...formData,
    basePrice: Number(formData.basePrice),
    finalPrice,
    stock: Number(formData.stock),
    imageGallery: formData.imageGallery.filter(img => img),
    tags: formData.tags.filter(tag => tag),
    tagsAr: formData.tagsAr.filter(tag => tag),
    sizes: formData.sizes.filter(size => size),
    colors: formData.colors.filter(c => c.name && c.hex),
    specifications: formData.specifications,
    specificationsAr: formData.specificationsAr,
    productType: formData.productType || undefined,
    secondtype: formData.secondtype || undefined,
    secondtypeAr: formData.secondtypeAr || undefined,
    thirdtype: formData.thirdtype || undefined,
    thirdtypeAr: formData.thirdtypeAr || undefined,
    shop: formData.shop || undefined,
    isExclusive: formData.isExclusive,
    toplay: formData.toplay
  };
};
