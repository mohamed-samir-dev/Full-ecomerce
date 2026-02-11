import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductFormData, ArrayFieldType } from '../types/product.types';
import { getInitialFormData, prepareProductData } from '../utils/productHelpers';

export const useProductForm = (productId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState<ProductFormData>(getInitialFormData());

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
      if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
      
      const result = await res.json();
      const data = result.success ? result.data : result;
      
      setFormData({
        name: data.name || '', nameAr: data.nameAr || '', slug: data.slug || '',
        shortDescription: data.shortDescription || '', shortDescriptionAr: data.shortDescriptionAr || '',
        description: data.description || '', descriptionAr: data.descriptionAr || '',
        basePrice: data.basePrice?.toString() || '', discount: data.discount || { type: 'percentage', value: 0 },
        currency: data.currency || 'EGP', mainImage: data.mainImage || '',
        imageGallery: data.imageGallery?.length ? data.imageGallery : [''], video: data.video || '',
        stock: data.stock?.toString() || '', sku: data.sku || '', availability: data.availability || 'in_stock',
        category: data.category || '', categoryAr: data.categoryAr || '',
        subCategory: data.subCategory || '', subCategoryAr: data.subCategoryAr || '',
        brand: data.brand || '', brandAr: data.brandAr || '',
        productType: data.productType || '', secondtype: data.secondtype || '', secondtypeAr: data.secondtypeAr || '',
        thirdtype: data.thirdtype || '', thirdtypeAr: data.thirdtypeAr || '',
        tags: data.tags?.length ? data.tags : [''], tagsAr: data.tagsAr?.length ? data.tagsAr : [''],
        sizes: data.sizes?.length ? data.sizes : [''], colors: data.colors?.length ? data.colors : [{ name: '', hex: '' }],
        material: data.material || '', weight: data.weight || '',
        dimensions: data.dimensions || { length: '', width: '', height: '' },
        warranty: data.warranty || '', returnPolicy: data.returnPolicy || '',
        specifications: typeof data.specifications === 'string' ? data.specifications : JSON.stringify(data.specifications || ''),
        specificationsAr: typeof data.specificationsAr === 'string' ? data.specificationsAr : JSON.stringify(data.specificationsAr || ''),
        shop: data.shop || '', isExclusive: data.isExclusive || false, toplay: data.toplay || false,
        initialReview: { rating: data.averageRating || 0, comment: '' }
      });
    } catch (error) {
      console.error('Failed to load product:', error);
      alert('Failed to load product. Please check if the product ID is valid.');
      router.push('/admin/products');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: ArrayFieldType, index: number, value: string) => {
    const fieldValue = formData[field];
    if (Array.isArray(fieldValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: fieldValue.map((item, i) => i === index ? value : item)
      }));
    }
  };

  const addArrayItem = (field: ArrayFieldType) => {
    const fieldValue = formData[field];
    if (Array.isArray(fieldValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...fieldValue, field === 'colors' ? { name: '', hex: '' } : '']
      }));
    }
  };

  const removeArrayItem = (field: ArrayFieldType, index: number) => {
    const fieldValue = formData[field];
    if (Array.isArray(fieldValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: fieldValue.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const productData = prepareProductData(formData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch {
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    fetchLoading,
    fetchProduct,
    handleChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    handleSubmit
  };
};
