'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface Product {
  brand?: string;
  brandAr?: string;
}

export default function BrandsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const brandSet = new Set<string>();
          
          data.data.forEach((product: Product) => {
            if (product.brand) brandSet.add(isArabic ? product.brandAr || product.brand : product.brand);
          });
          
          setBrands(Array.from(brandSet).sort());
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
          {isArabic ? 'العلامات التجارية' : 'Brands'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className={`rounded-lg shadow p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'جميع العلامات التجارية' : 'All Brands'} ({brands.length})
            </h2>
            {brands.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isArabic ? 'لا توجد علامات تجارية' : 'No brands found'}
              </p>
            ) : (
              <ul className="space-y-2 max-h-[280px] overflow-y-auto">
                {brands.map((brand, idx) => (
                  <li key={idx} className={`p-2 sm:p-3 rounded text-sm sm:text-base ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {brand}
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
