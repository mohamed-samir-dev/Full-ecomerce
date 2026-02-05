'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarRating from '../../components/StarRating';
import FormSection from './FormSection';

type ArrayFieldType = 'imageGallery' | 'tags' | 'tagsAr' | 'sizes' | 'colors';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', nameAr: '', slug: '', shortDescription: '', shortDescriptionAr: '',
    description: '', descriptionAr: '', basePrice: '', discount: { type: 'percentage', value: 0 },
    currency: 'EGP', mainImage: '', imageGallery: [''], video: '', stock: '', sku: '',
    availability: 'in_stock', category: '', categoryAr: '', subCategory: '', subCategoryAr: '',
    brand: '', brandAr: '', productType: '', secondtype: '', tags: [''], tagsAr: [''], sizes: [''], colors: [{ name: '', hex: '' }],
    material: '', weight: '', dimensions: { length: '', width: '', height: '' },
    warranty: '', returnPolicy: '', specifications: '', specificationsAr: '',
    initialReview: { rating: 0, comment: '' }
  });

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
        variants: [],
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

      if (response.ok) {
        alert('Product added successfully!');
        router.push('/admin');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch {
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-500 mt-1">Fill in the details to create a new product</p>
            </div>
            <button onClick={() => router.back()} className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              ← Back
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <FormSection title="📝 Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Product Name (English) *</label>
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Product Name (Arabic) *</label>
                  <input name="nameAr" value={formData.nameAr} onChange={handleChange} placeholder="أدخل اسم المنتج" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Slug *</label>
                  <input name="slug" value={formData.slug} onChange={handleChange} placeholder="product-slug" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>SKU *</label>
                  <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU-12345" className={inputClass} required />
                </div>
              </div>
            </FormSection>

            <FormSection title="📄 Descriptions">
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Short Description (English) *</label>
                    <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Brief product description" className={inputClass + " h-24 resize-none"} required />
                  </div>
                  <div>
                    <label className={labelClass}>Short Description (Arabic) *</label>
                    <textarea name="shortDescriptionAr" value={formData.shortDescriptionAr} onChange={handleChange} placeholder="وصف مختصر للمنتج" className={inputClass + " h-24 resize-none"} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Description (English) *</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed product description" className={inputClass + " h-32 resize-none"} required />
                  </div>
                  <div>
                    <label className={labelClass}>Full Description (Arabic) *</label>
                    <textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} placeholder="وصف تفصيلي للمنتج" className={inputClass + " h-32 resize-none"} required />
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection title="💰 Pricing & Stock">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className={labelClass}>Base Price *</label>
                  <input name="basePrice" type="number" value={formData.basePrice} onChange={handleChange} placeholder="0.00" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className={inputClass}>
                    <option value="EGP">EGP (Egyptian Pound)</option>
                    <option value="USD">USD (US Dollar)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Stock Quantity *</label>
                  <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="0" className={inputClass} required />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Discount Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Discount Type</label>
                    <select value={formData.discount.type} onChange={(e) => setFormData(prev => ({ ...prev, discount: { ...prev.discount, type: e.target.value } }))} className={inputClass}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Discount Value</label>
                    <input type="number" value={formData.discount.value} onChange={(e) => setFormData(prev => ({ ...prev, discount: { ...prev.discount, value: Number(e.target.value) } }))} placeholder="0" className={inputClass} />
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection title="🖼️ Media">
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Main Image URL *</label>
                  <input name="mainImage" value={formData.mainImage} onChange={handleChange} placeholder="https://example.com/image.jpg" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Gallery Images</label>
                  <div className="space-y-2">
                    {formData.imageGallery.map((img, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={img} onChange={(e) => handleArrayChange('imageGallery', i, e.target.value)} placeholder={`Image URL ${i + 1}`} className={inputClass} />
                        <button type="button" onClick={() => removeArrayItem('imageGallery', i)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('imageGallery')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">+ Add Image</button>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Video URL (Optional)</label>
                  <input name="video" value={formData.video} onChange={handleChange} placeholder="https://youtube.com/..." className={inputClass} />
                </div>
              </div>
            </FormSection>

            <FormSection title="🏷️ Categories & Brand">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Category (English) *</label>
                  <input name="category" value={formData.category} onChange={handleChange} placeholder="Electronics" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Category (Arabic) *</label>
                  <input name="categoryAr" value={formData.categoryAr} onChange={handleChange} placeholder="إلكترونيات" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Sub Category (English)</label>
                  <input name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Smartphones" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sub Category (Arabic)</label>
                  <input name="subCategoryAr" value={formData.subCategoryAr} onChange={handleChange} placeholder="هواتف ذكية" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Brand (English) *</label>
                  <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Apple" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Brand (Arabic) *</label>
                  <input name="brandAr" value={formData.brandAr} onChange={handleChange} placeholder="أبل" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Product Type</label>
                  <input name="productType" value={formData.productType} onChange={handleChange} placeholder="Type" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Second Type</label>
                  <input name="secondtype" value={formData.secondtype} onChange={handleChange} placeholder="Second Type" className={inputClass} />
                </div>
              </div>
            </FormSection>

            <FormSection title="🔖 Tags">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Tags (English)</label>
                  {formData.tags.map((tag, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={tag} onChange={(e) => handleArrayChange('tags', i, e.target.value)} placeholder="Tag" className={inputClass} />
                      <button type="button" onClick={() => removeArrayItem('tags', i)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('tags')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">+ Add Tag</button>
                </div>
                <div>
                  <label className={labelClass}>Tags (Arabic)</label>
                  {formData.tagsAr.map((tag, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={tag} onChange={(e) => handleArrayChange('tagsAr', i, e.target.value)} placeholder="وسم" className={inputClass} />
                      <button type="button" onClick={() => removeArrayItem('tagsAr', i)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('tagsAr')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">+ Add Tag</button>
                </div>
              </div>
            </FormSection>

            <FormSection title="🎨 Variants">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Available Sizes</label>
                  {formData.sizes.map((size, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={size} onChange={(e) => handleArrayChange('sizes', i, e.target.value)} placeholder="S, M, L, XL" className={inputClass} />
                      <button type="button" onClick={() => removeArrayItem('sizes', i)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('sizes')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">+ Add Size</button>
                </div>
                <div>
                  <label className={labelClass}>Available Colors</label>
                  {formData.colors.map((color, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={color.name} onChange={(e) => setFormData(prev => ({ ...prev, colors: prev.colors.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c) }))} placeholder="Color Name" className={inputClass} />
                      <input value={color.hex} onChange={(e) => setFormData(prev => ({ ...prev, colors: prev.colors.map((c, idx) => idx === i ? { ...c, hex: e.target.value } : c) }))} placeholder="#000000" className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900" />
                      <button type="button" onClick={() => removeArrayItem('colors', i)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('colors')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">+ Add Color</button>
                </div>
              </div>
            </FormSection>

            <FormSection title="📦 Product Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={labelClass}>Material</label>
                  <input name="material" value={formData.material} onChange={handleChange} placeholder="Cotton, Plastic, Metal..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Weight</label>
                  <input name="weight" value={formData.weight} onChange={handleChange} placeholder="500g, 1kg..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Warranty</label>
                  <input name="warranty" value={formData.warranty} onChange={handleChange} placeholder="1 Year, 2 Years..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Return Policy</label>
                  <input name="returnPolicy" value={formData.returnPolicy} onChange={handleChange} placeholder="30 Days Return" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Dimensions</label>
                <div className="grid grid-cols-3 gap-4">
                  <input value={formData.dimensions.length} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, length: e.target.value } }))} placeholder="Length (cm)" className={inputClass} />
                  <input value={formData.dimensions.width} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, width: e.target.value } }))} placeholder="Width (cm)" className={inputClass} />
                  <input value={formData.dimensions.height} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, height: e.target.value } }))} placeholder="Height (cm)" className={inputClass} />
                </div>
              </div>
            </FormSection>

            <FormSection title="📋 Specifications">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Specifications (English)</label>
                  <textarea name="specifications" value={formData.specifications} onChange={handleChange} placeholder="List product specifications..." className={inputClass + " h-32 resize-none"} />
                </div>
                <div>
                  <label className={labelClass}>Specifications (Arabic)</label>
                  <textarea name="specificationsAr" value={formData.specificationsAr} onChange={handleChange} placeholder="قائمة مواصفات المنتج..." className={inputClass + " h-32 resize-none"} />
                </div>
              </div>
            </FormSection>

            <FormSection title="📊 Availability">
              <div>
                <label className={labelClass}>Stock Status</label>
                <select name="availability" value={formData.availability} onChange={handleChange} className={inputClass}>
                  <option value="in_stock">✅ In Stock</option>
                  <option value="out_of_stock">❌ Out of Stock</option>
                  <option value="pre_order">🔔 Pre Order</option>
                </select>
              </div>
            </FormSection>

            <FormSection title="⭐ Initial Review (Optional)">
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Rating</label>
                  <StarRating
                    rating={formData.initialReview.rating}
                    onRatingChange={(rating) => setFormData(prev => ({ ...prev, initialReview: { ...prev.initialReview, rating } }))}
                    size="lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">Add an initial rating for this product</p>
                </div>
                <div>
                  <label className={labelClass}>Review Comment</label>
                  <textarea
                    value={formData.initialReview.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, initialReview: { ...prev.initialReview, comment: e.target.value } }))}
                    placeholder="Write an initial review..."
                    className={inputClass + " h-24 resize-none"}
                  />
                </div>
              </div>
            </FormSection>

            <div className="flex gap-4 justify-end mt-8">
              <button type="button" onClick={() => router.back()} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-medium shadow-lg">
                {loading ? '⏳ Adding Product...' : '✓ Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
