'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import StarRating from '../../components/StarRating';

type ArrayFieldType = 'imageGallery' | 'tags' | 'tagsAr' | 'sizes' | 'colors';

export default function AddProductPage() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
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

  const tabs = [
    { id: 0, name: isArabic ? 'معلومات أساسية' : 'Basic Info', icon: '📝' },
    { id: 1, name: isArabic ? 'التسعير' : 'Pricing', icon: '💰' },
    { id: 2, name: isArabic ? 'الوسائط' : 'Media', icon: '🖼️' },
    { id: 3, name: isArabic ? 'التصنيفات' : 'Categories', icon: '📂' },
    { id: 4, name: isArabic ? 'المتغيرات' : 'Variants', icon: '🎨' },
    { id: 5, name: isArabic ? 'التفاصيل' : 'Details', icon: '📋' },
  ];

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

  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen py-4 sm:py-6 px-3 sm:px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`rounded-xl shadow-lg mb-4 sm:mb-6 overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-600 to-blue-500'}`}>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">✨ {isArabic ? 'إضافة منتج جديد' : 'Add New Product'}</h1>
                <p className="text-sm sm:text-base text-blue-100">{isArabic ? 'إنشاء منتج جديد في متجرك' : 'Create a new product in your store'}</p>
              </div>
              <button 
                onClick={() => router.back()} 
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all backdrop-blur-sm whitespace-nowrap"
              >
                {isArabic ? 'رجوع' : '← Back'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-xl shadow-lg mb-4 sm:mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex overflow-x-auto border-b border-gray-700 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'border-b-2 border-blue-500 text-blue-400 bg-gray-700/50'
                      : 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg sm:text-xl">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {/* Tab 0: Basic Info */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{isArabic ? 'اسم المنتج (إنجليزي) *' : 'Product Name (English) *'}</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'اسم المنتج (عربي) *' : 'Product Name (Arabic) *'}</label>
                    <input name="nameAr" value={formData.nameAr} onChange={handleChange} placeholder="أدخل اسم المنتج" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'الرابط *' : 'Slug *'}</label>
                    <input name="slug" value={formData.slug} onChange={handleChange} placeholder="product-slug" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'رمز المنتج *' : 'SKU *'}</label>
                    <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU-12345" className={inputClass} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{isArabic ? 'وصف مختصر (إنجليزي) *' : 'Short Description (English) *'}</label>
                    <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Brief description" className={inputClass + " h-20 resize-none"} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'وصف مختصر (عربي) *' : 'Short Description (Arabic) *'}</label>
                    <textarea name="shortDescriptionAr" value={formData.shortDescriptionAr} onChange={handleChange} placeholder="وصف مختصر" className={inputClass + " h-20 resize-none"} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'وصف كامل (إنجليزي) *' : 'Full Description (English) *'}</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed description" className={inputClass + " h-24 resize-none"} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'وصف كامل (عربي) *' : 'Full Description (Arabic) *'}</label>
                    <textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} placeholder="وصف تفصيلي" className={inputClass + " h-24 resize-none"} required />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 1: Pricing */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>{isArabic ? 'السعر الأساسي *' : 'Base Price *'}</label>
                    <input name="basePrice" type="number" value={formData.basePrice} onChange={handleChange} placeholder="0.00" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'العملة' : 'Currency'}</label>
                    <select name="currency" value={formData.currency} onChange={handleChange} className={inputClass}>
                      <option value="EGP">EGP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'المخزون *' : 'Stock *'}</label>
                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="0" className={inputClass} required />
                  </div>
                </div>
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>💸 {isArabic ? 'الخصم' : 'Discount'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{isArabic ? 'النوع' : 'Type'}</label>
                      <select value={formData.discount.type} onChange={(e) => setFormData(prev => ({ ...prev, discount: { ...prev.discount, type: e.target.value } }))} className={inputClass}>
                        <option value="percentage">{isArabic ? 'نسبة مئوية (%)' : 'Percentage (%)'}</option>
                        <option value="fixed">{isArabic ? 'مبلغ ثابت' : 'Fixed Amount'}</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{isArabic ? 'القيمة' : 'Value'}</label>
                      <input type="number" value={formData.discount.value} onChange={(e) => setFormData(prev => ({ ...prev, discount: { ...prev.discount, value: Number(e.target.value) } }))} placeholder="0" className={inputClass} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{isArabic ? 'التوفر' : 'Availability'}</label>
                    <select name="availability" value={formData.availability} onChange={handleChange} className={inputClass}>
                      <option value="in_stock">{isArabic ? 'متوفر' : 'In Stock'}</option>
                      <option value="out_of_stock">{isArabic ? 'غير متوفر' : 'Out of Stock'}</option>
                      <option value="pre_order">{isArabic ? 'طلب مسبق' : 'Pre Order'}</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'المتجر' : 'Shop'}</label>
                    <input name="shop" value={formData.shop} onChange={handleChange} placeholder="Shop name" className={inputClass} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input type="checkbox" checked={formData.isExclusive} onChange={(e) => setFormData(prev => ({ ...prev, isExclusive: e.target.checked }))} className="w-4 h-4 rounded" />
                    <span>⭐ {isArabic ? 'حصري' : 'Exclusive'}</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input type="checkbox" checked={formData.toplay} onChange={(e) => setFormData(prev => ({ ...prev, toplay: e.target.checked }))} className="w-4 h-4 rounded" />
                    <span>🔝 {isArabic ? 'عرض في الأعلى' : 'Top Display'}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Tab 2: Media */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>{isArabic ? 'رابط الصورة الرئيسية *' : 'Main Image URL *'}</label>
                  <input name="mainImage" value={formData.mainImage} onChange={handleChange} placeholder="https://example.com/image.jpg" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>{isArabic ? 'معرض الصور' : 'Gallery Images'}</label>
                  <div className="space-y-2">
                    {formData.imageGallery.map((img, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={img} onChange={(e) => handleArrayChange('imageGallery', i, e.target.value)} placeholder={`Image URL ${i + 1}`} className={inputClass} />
                        <button type="button" onClick={() => removeArrayItem('imageGallery', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('imageGallery')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{isArabic ? '+ إضافة صورة' : '+ Add Image'}</button>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{isArabic ? 'رابط الفيديو' : 'Video URL'}</label>
                  <input name="video" value={formData.video} onChange={handleChange} placeholder="https://youtube.com/..." className={inputClass} />
                </div>
              </div>
            )}

            {/* Tab 3: Categories */}
            {activeTab === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category (EN) *</label>
                    <input name="category" value={formData.category} onChange={handleChange} placeholder="Electronics" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Category (AR) *</label>
                    <input name="categoryAr" value={formData.categoryAr} onChange={handleChange} placeholder="إلكترونيات" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Sub Category (EN)</label>
                    <input name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Smartphones" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Sub Category (AR)</label>
                    <input name="subCategoryAr" value={formData.subCategoryAr} onChange={handleChange} placeholder="هواتف ذكية" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'العلامة التجارية (إنجليزي) *' : 'Brand (EN) *'}</label>
                    <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Apple" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'العلامة التجارية (عربي) *' : 'Brand (AR) *'}</label>
                    <input name="brandAr" value={formData.brandAr} onChange={handleChange} placeholder="أبل" className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'نوع المنتج (إنجليزي)' : 'Product Type (EN)'}</label>
                    <input name="productType" value={formData.productType} onChange={handleChange} placeholder="Type" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'النوع الثاني (إنجليزي)' : 'Second Type (EN)'}</label>
                    <input name="secondtype" value={formData.secondtype} onChange={handleChange} placeholder="Second Type" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'النوع الثاني (عربي)' : 'Second Type (AR)'}</label>
                    <input name="secondtypeAr" value={formData.secondtypeAr} onChange={handleChange} placeholder="النوع الثاني" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'النوع الثالث (إنجليزي)' : 'Third Type (EN)'}</label>
                    <input name="thirdtype" value={formData.thirdtype} onChange={handleChange} placeholder="Third Type" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'النوع الثالث (عربي)' : 'Third Type (AR)'}</label>
                    <input name="thirdtypeAr" value={formData.thirdtypeAr} onChange={handleChange} placeholder="النوع الثالث" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Tags (EN)</label>
                    {formData.tags.map((tag, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input value={tag} onChange={(e) => handleArrayChange('tags', i, e.target.value)} placeholder="Tag" className={inputClass} />
                        <button type="button" onClick={() => removeArrayItem('tags', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('tags')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{isArabic ? '+ إضافة وسم' : '+ Add Tag'}</button>
                  </div>
                  <div>
                    <label className={labelClass}>Tags (AR)</label>
                    {formData.tagsAr.map((tag, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input value={tag} onChange={(e) => handleArrayChange('tagsAr', i, e.target.value)} placeholder="وسم" className={inputClass} />
                        <button type="button" onClick={() => removeArrayItem('tagsAr', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('tagsAr')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{isArabic ? '+ إضافة وسم' : '+ Add Tag'}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Variants */}
            {activeTab === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{isArabic ? 'المقاسات' : 'Sizes'}</label>
                    {formData.sizes.map((size, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input value={size} onChange={(e) => handleArrayChange('sizes', i, e.target.value)} placeholder="S, M, L" className={inputClass} />
                        <button type="button" onClick={() => removeArrayItem('sizes', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('sizes')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{isArabic ? '+ إضافة مقاس' : '+ Add Size'}</button>
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'الألوان' : 'Colors'}</label>
                    {formData.colors.map((color, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input value={color.name} onChange={(e) => setFormData(prev => ({ ...prev, colors: prev.colors.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c) }))} placeholder="Color" className={inputClass} />
                        <input value={color.hex} onChange={(e) => setFormData(prev => ({ ...prev, colors: prev.colors.map((c, idx) => idx === i ? { ...c, hex: e.target.value } : c) }))} placeholder="#000" className="w-24 px-3 py-2 border rounded-lg" />
                        <button type="button" onClick={() => removeArrayItem('colors', i)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('colors')} className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{isArabic ? '+ إضافة لون' : '+ Add Color'}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Details */}
            {activeTab === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{isArabic ? 'الخامة' : 'Material'}</label>
                    <input name="material" value={formData.material} onChange={handleChange} placeholder="Cotton, Metal..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'الوزن' : 'Weight'}</label>
                    <input name="weight" value={formData.weight} onChange={handleChange} placeholder="500g" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'الضمان' : 'Warranty'}</label>
                    <input name="warranty" value={formData.warranty} onChange={handleChange} placeholder="1 Year" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'سياسة الإرجاع' : 'Return Policy'}</label>
                    <input name="returnPolicy" value={formData.returnPolicy} onChange={handleChange} placeholder="30 Days" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{isArabic ? 'الأبعاد' : 'Dimensions'}</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input value={formData.dimensions.length} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, length: e.target.value } }))} placeholder="Length" className={inputClass} />
                    <input value={formData.dimensions.width} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, width: e.target.value } }))} placeholder="Width" className={inputClass} />
                    <input value={formData.dimensions.height} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, height: e.target.value } }))} placeholder="Height" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{isArabic ? 'المواصفات (إنجليزي)' : 'Specifications (EN)'}</label>
                    <textarea name="specifications" value={formData.specifications} onChange={handleChange} placeholder="Specifications..." className={inputClass + " h-24 resize-none"} />
                  </div>
                  <div>
                    <label className={labelClass}>{isArabic ? 'المواصفات (عربي)' : 'Specifications (AR)'}</label>
                    <textarea name="specificationsAr" value={formData.specificationsAr} onChange={handleChange} placeholder="المواصفات..." className={inputClass + " h-24 resize-none"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{isArabic ? 'التقييم الأولي' : 'Initial Rating'}</label>
                  <StarRating
                    rating={formData.initialReview.rating}
                    onRatingChange={(rating) => setFormData(prev => ({ ...prev, initialReview: { ...prev.initialReview, rating } }))}
                    size="lg"
                  />
                  <textarea
                    value={formData.initialReview.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, initialReview: { ...prev.initialReview, comment: e.target.value } }))}
                    placeholder="Review comment..."
                    className={inputClass + " h-20 resize-none mt-2"}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base ${activeTab === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'} ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {isArabic ? 'السابق →' : '← Previous'}
              </button>
              <div className="flex gap-2 sm:gap-3">
                <button 
                  type="button" 
                  onClick={() => router.back()} 
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                {activeTab === tabs.length - 1 ? (
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium text-sm sm:text-base disabled:opacity-50"
                  >
                    {loading ? (isArabic ? '⏳ جاري الإضافة...' : '⏳ Adding...') : (isArabic ? '✓ إضافة منتج' : '✓ Add Product')}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base"
                  >
                    {isArabic ? '← التالي' : 'Next →'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
