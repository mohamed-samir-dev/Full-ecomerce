import { useState } from 'react';
import { Product } from '../../../shop/types';
import { useLanguage } from '@/context/LanguageContext';

interface ProductDetailsTabsProps {
  product: Product;
}

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const { isArabic } = useLanguage();
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  const specs = [
    { label: isArabic ? 'العلامة التجارية' : 'Brand', value: isArabic ? product.brandAr : product.brand },
    { label: isArabic ? 'الفئة' : 'Category', value: isArabic ? product.categoryAr : product.category },
    { label: isArabic ? 'رمز المنتج' : 'SKU', value: product.sku },
    { label: isArabic ? 'التوفر' : 'Availability', value: isArabic ? (product.availability === 'in_stock' ? 'متوفر' : product.availability === 'out_of_stock' ? 'غير متوفر' : 'طلب مسبق') : product.availability.replace('_', ' ').toUpperCase() },
    { label: isArabic ? 'المخزون' : 'Stock', value: product.stock > 0 ? (isArabic ? `${product.stock} قطعة` : `${product.stock} units`) : (isArabic ? 'غير متوفر' : 'Out of stock') },
    ...(product.sizes?.length ? [{ label: isArabic ? 'المقاسات المتاحة' : 'Available Sizes', value: product.sizes.join(', ') }] : []),
    ...(product.colors?.length ? [{ label: isArabic ? 'الألوان المتاحة' : 'Available Colors', value: product.colors.map(c => c.name).join(', ') }] : []),
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex-1 py-4 px-6 text-base font-medium transition-all relative ${
            activeTab === 'description' ? 'text-[#B39E7A]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {isArabic ? 'الوصف' : 'Description'}
          {activeTab === 'description' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B39E7A]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('specifications')}
          className={`flex-1 py-4 px-6 text-base font-medium transition-all relative ${
            activeTab === 'specifications' ? 'text-[#B39E7A]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {isArabic ? 'المواصفات' : 'Specifications'}
          {activeTab === 'specifications' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B39E7A]"></div>
          )}
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {activeTab === 'description' ? (
          <div className="space-y-6">
            {product.shortDescription && (
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-3">{isArabic ? 'نظرة عامة' : 'Overview'}</h3>
                <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>
              </div>
            )}
            {product.description && (
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-3">{isArabic ? 'التفاصيل' : 'Details'}</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
            {!product.shortDescription && !product.description && (
              <p className="text-gray-500 italic">{isArabic ? 'لا يوجد وصف لهذا المنتج.' : 'No description available for this product.'}</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-600">{spec.label}</span>
                <span className="text-sm text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
