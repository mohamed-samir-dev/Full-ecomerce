'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoriesPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [secondTypes, setSecondTypes] = useState<string[]>([]);
  const [thirdTypes, setThirdTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const cats = new Set<string>();
          const subCats = new Set<string>();
          const prodTypes = new Set<string>();
          const secTypes = new Set<string>();
          const thrTypes = new Set<string>();
          
          data.data.forEach((product: any) => {
            if (product.category) cats.add(isArabic ? product.categoryAr || product.category : product.category);
            if (product.subCategory) subCats.add(isArabic ? product.subCategoryAr || product.subCategory : product.subCategory);
            if (product.productType) prodTypes.add(product.productType);
            if (product.secondtype) secTypes.add(isArabic ? product.secondtypeAr || product.secondtype : product.secondtype);
            if (product.thirdtype) thrTypes.add(isArabic ? product.thirdtypeAr || product.thirdtype : product.thirdtype);
          });
          
          setCategories(Array.from(cats).sort());
          setSubCategories(Array.from(subCats).sort());
          setProductTypes(Array.from(prodTypes).sort());
          setSecondTypes(Array.from(secTypes).sort());
          setThirdTypes(Array.from(thrTypes).sort());
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isArabic]);

  if (loading) {
    return (
      <div className={`min-h-screen p-6 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? 'الفئات' : 'Categories'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className={`rounded-lg shadow p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'الفئات الرئيسية' : 'Categories'} ({categories.length})
            </h2>
            {categories.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isArabic ? 'لا توجد فئات' : 'No categories'}
              </p>
            ) : (
              <ul className="space-y-2 max-h-[280px] overflow-y-auto">
                {categories.map((cat, idx) => (
                  <li key={idx} className={`p-2 sm:p-3 rounded text-sm sm:text-base ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'الفئات الفرعية' : 'Sub Categories'} ({subCategories.length})
            </h2>
            {subCategories.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isArabic ? 'لا توجد فئات فرعية' : 'No sub categories'}
              </p>
            ) : (
              <ul className="space-y-2 max-h-[280px] overflow-y-auto">
                {subCategories.map((cat, idx) => (
                  <li key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'أنواع المنتجات' : 'Product Types'} ({productTypes.length})
            </h2>
            {productTypes.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isArabic ? 'لا توجد أنواع' : 'No product types'}
              </p>
            ) : (
              <ul className="space-y-2 max-h-[280px] overflow-y-auto">
                {productTypes.map((type, idx) => (
                  <li key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'النوع الثاني' : 'Second Types'} ({secondTypes.length})
            </h2>
            {secondTypes.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isArabic ? 'لا توجد أنواع ثانية' : 'No second types'}
              </p>
            ) : (
              <ul className="space-y-2 max-h-[280px] overflow-y-auto">
                {secondTypes.map((type, idx) => (
                  <li key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`rounded-lg shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'النوع الثالث' : 'Third Types'} ({thirdTypes.length})
            </h2>
            {thirdTypes.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isArabic ? 'لا توجد أنواع ثالثة' : 'No third types'}
              </p>
            ) : (
              <ul className="space-y-2 max-h-[280px] overflow-y-auto">
                {thirdTypes.map((type, idx) => (
                  <li key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
