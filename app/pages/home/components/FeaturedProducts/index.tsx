'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import FeaturedProductCard from './FeaturedProductCard';
import {Product}from '../../types/home.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function FeaturedProducts() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=8&sort=newest`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productCards = useMemo(() => 
    products.map((product) => (
      <FeaturedProductCard key={product._id} product={product} />
    )), [products]
  );

  if (loading) {
    return (
      <div className={`py-16 sm:py-20 ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-8 sm:py-12 md:py-16 lg:py-20 ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {t('home.featuredProducts.title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-[300px]:grid-cols-1">
          {productCards}
        </div>
      </div>
    </div>
  );
}
