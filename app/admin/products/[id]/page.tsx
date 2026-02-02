'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FormSection from '../../add-product/FormSection';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', nameAr: '', slug: '', shortDescription: '', shortDescriptionAr: '',
    description: '', descriptionAr: '', basePrice: '', discount: { type: 'percentage', value: 0 },
    currency: 'EGP', mainImage: '', imageGallery: [''], video: '', stock: '', sku: '',
    availability: 'in_stock', category: '', categoryAr: '', subCategory: '', subCategoryAr: '',
    brand: '', brandAr: '', tags: [''], tagsAr: [''], sizes: [''], colors: [{ name: '', hex: '' }],
    material: '', weight: '', dimensions: { length: '', width: '', height: '' },
    warranty: '', returnPolicy: '', specifications: '', specificationsAr: ''
  });

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch product: ${res.status}`);
      }
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
        tags: data.tags?.length ? data.tags : [''], tagsAr: data.tagsAr?.length ? data.tagsAr : [''],
        sizes: data.sizes?.length ? data.sizes : [''], colors: data.colors?.length ? data.colors : [{ name: '', hex: '' }],
        material: data.material || '', weight: data.weight || '',
        dimensions: data.dimensions || { length: '', width: '', height: '' },
        warranty: data.warranty || '', returnPolicy: data.returnPolicy || '',
        specifications: typeof data.specifications === 'string' ? data.specifications : JSON.stringify(data.specifications || ''),
        specificationsAr: typeof data.specificationsAr === 'string' ? data.specificationsAr : JSON.stringify(data.specificationsAr || '')
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (field: keyof Pick<typeof formData, 'imageGallery' | 'tags' | 'tagsAr' | 'sizes'>, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof Pick<typeof formData, 'imageGallery' | 'tags' | 'tagsAr' | 'sizes' | 'colors'>) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], field === 'colors' ? { name: '', hex: '' } : ''] as typeof prev[typeof field]
    }));
  };

  const removeArrayItem = (field: keyof Pick<typeof formData, 'imageGallery' | 'tags' | 'tagsAr' | 'sizes' | 'colors'>, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: unknown, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const finalPrice = formData.discount.type === 'percentage'
        ? Number(formData.basePrice) * (1 - formData.discount.value / 100)
        : Number(formData.basePrice) - formData.discount.value;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          ...formData,
          basePrice: Number(formData.basePrice),
          finalPrice,
          stock: Number(formData.stock),
          imageGallery: formData.imageGallery.filter(img => img),
          tags: formData.tags.filter(tag => tag),
          tagsAr: formData.tagsAr.filter(tag => tag),
          sizes: formData.sizes.filter(size => size),
          colors: formData.colors.filter(c => c.name && c.hex)
        })
      });

      if (response.ok) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch {
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  if (fetchLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div></div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div><h1 className="text-3xl font-bold text-gray-900">Edit Product</h1><p className="text-gray-500 mt-1">Update product information</p></div>
            <button onClick={() => router.back()} className="px-4 py-2 text-gray-600 hover:text-gray-900">← Back</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <FormSection title="📝 Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>Product Name (English) *</label><input name="name" value={formData.name} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>Product Name (Arabic) *</label><input name="nameAr" value={formData.nameAr} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>Slug *</label><input name="slug" value={formData.slug} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>SKU *</label><input name="sku" value={formData.sku} onChange={handleChange} className={inputClass} required /></div>
              </div>
            </FormSection>

            <FormSection title="📄 Descriptions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div><label className={labelClass}>Short Description (English) *</label><textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className={inputClass + " h-24"} required /></div>
                <div><label className={labelClass}>Short Description (Arabic) *</label><textarea name="shortDescriptionAr" value={formData.shortDescriptionAr} onChange={handleChange} className={inputClass + " h-24"} required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>Full Description (English) *</label><textarea name="description" value={formData.description} onChange={handleChange} className={inputClass + " h-32"} required /></div>
                <div><label className={labelClass}>Full Description (Arabic) *</label><textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} className={inputClass + " h-32"} required /></div>
              </div>
            </FormSection>

            <FormSection title="💰 Pricing & Stock">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div><label className={labelClass}>Base Price *</label><input name="basePrice" type="number" value={formData.basePrice} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>Currency</label><select name="currency" value={formData.currency} onChange={handleChange} className={inputClass}><option value="EGP">EGP</option><option value="USD">USD</option></select></div>
                <div><label className={labelClass}>Stock *</label><input name="stock" type="number" value={formData.stock} onChange={handleChange} className={inputClass} required /></div>
              </div>
            </FormSection>

            <FormSection title="🖼️ Media">
              <div><label className={labelClass}>Main Image *</label><input name="mainImage" value={formData.mainImage} onChange={handleChange} className={inputClass} required /></div>
              <div className="mt-4"><label className={labelClass}>Gallery</label>{formData.imageGallery.map((img, i) => (<div key={i} className="flex gap-2 mb-2"><input value={img} onChange={(e) => handleArrayChange('imageGallery', i, e.target.value)} className={inputClass} /><button type="button" onClick={() => removeArrayItem('imageGallery', i)} className="px-4 py-2 bg-red-500 text-white rounded-lg">✕</button></div>))}<button type="button" onClick={() => addArrayItem('imageGallery')} className="text-blue-600 text-sm">+ Add</button></div>
            </FormSection>

            <FormSection title="🏷️ Categories & Brand">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>Category (EN) *</label><input name="category" value={formData.category} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>Category (AR) *</label><input name="categoryAr" value={formData.categoryAr} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>Brand (EN) *</label><input name="brand" value={formData.brand} onChange={handleChange} className={inputClass} required /></div>
                <div><label className={labelClass}>Brand (AR) *</label><input name="brandAr" value={formData.brandAr} onChange={handleChange} className={inputClass} required /></div>
              </div>
            </FormSection>

            <div className="flex gap-4 justify-end mt-8">
              <button type="button" onClick={() => router.back()} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium">{loading ? '⏳ Updating...' : '✓ Update'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
