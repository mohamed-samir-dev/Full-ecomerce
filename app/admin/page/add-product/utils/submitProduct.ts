import { ProductFormData } from '../types/product';

export const submitProduct = async (formData: ProductFormData) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const finalPrice = formData.basePrice 
    ? formData.discount.type === 'percentage'
      ? Number(formData.basePrice) * (1 - formData.discount.value / 100)
      : Number(formData.basePrice) - formData.discount.value
    : 0;

  const productData = {
    ...formData,
    basePrice: Number(formData.basePrice),
    finalPrice,
    stock: Number(formData.stock),
    imageGallery: formData.imageGallery.filter(img => img),
    tags: formData.tags.filter(tag => tag),
    tagsAr: formData.tagsAr.filter(tag => tag),
    sizes: formData.sizes.filter(size => size),
    colors: formData.colors.filter(c => c.name && c.hex),
    averageRating: formData.initialReview.rating,
    totalReviews: formData.initialReview.rating > 0 ? 1 : 0,
    specifications: formData.specifications,
    specificationsAr: formData.specificationsAr,
    productType: formData.productType || undefined,
    secondtype: formData.secondtype || undefined,
    secondtypeAr: formData.secondtypeAr || undefined,
    thirdtype: formData.thirdtype || undefined,
    thirdtypeAr: formData.thirdtypeAr || undefined,
    variants: [],
    shop: formData.shop || undefined,
    isExclusive: formData.isExclusive,
    toplay: formData.toplay,
    reviews: formData.initialReview.rating > 0 ? [{
      userId: 'admin',
      rating: formData.initialReview.rating,
      comment: formData.initialReview.comment,
      createdAt: new Date()
    }] : []
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
