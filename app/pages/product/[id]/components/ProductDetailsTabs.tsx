import { useState } from 'react';
import { Product } from '../../../shop/types';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

interface ProductDetailsTabsProps {
  product: Product;
}

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
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
    <div className={`rounded-3xl border overflow-hidden shadow-lg ${
      isDarkMode ? 'bg-[#23272F] border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
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
                <h3 className={`text-xl font-light mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{isArabic ? 'نظرة عامة' : 'Overview'}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{isArabic ? (product.shortDescriptionAr || product.shortDescription) : product.shortDescription}</p>
              </div>
            )}
            {product.description && (
              <div>
                <h3 className={`text-xl font-light mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{isArabic ? 'التفاصيل' : 'Details'}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? (product.descriptionAr || product.description) : product.description}</p>
              </div>
            )}
            {!product.shortDescription && !product.description && (
              <p className="text-gray-500 italic">{isArabic ? 'لا يوجد وصف لهذا المنتج.' : 'No description available for this product.'}</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className={`flex justify-between py-3 border-b last:border-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{spec.label}</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
