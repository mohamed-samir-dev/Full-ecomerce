"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { Product } from '../../shop/types';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/info/ProductInfo';
import ProductDetailsTabs from './components/ProductDetailsTabs';
import ProductReviews from './components/ProductReviews';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { generateProductSchema, generateBreadcrumbSchema } from '@/app/utils/seo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function ProductDetailsPage() {
  const params = useParams();
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${params.id}`);
        if (!response.ok) throw new Error('Product not found');
        const result = await response.json();
        console.log('Fetched result:', result);
        setProduct(result.data || result);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B39E7A] absolute inset-0"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isDarkMode ? 'bg-[#23272F]' : 'bg-gray-100'}`}>
            <svg className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className={`text-3xl font-light mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{isArabic ? 'المنتج غير موجود' : 'Product not found'}</h1>
          <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'المنتج الذي تبحث عنه غير موجود أو تم حذفه.' : "The product you're looking for doesn't exist or has been removed."}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-[#B39E7A] text-white rounded-full font-medium hover:bg-[#A08D6A] transition-all shadow-md hover:shadow-lg"
          >
            {isArabic ? 'رجوع' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {product && (
        <>
          <Script
            id="product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }}
          />
          <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: isArabic ? 'الرئيسية' : 'Home', url: SITE_URL },
                  { name: isArabic ? 'المتجر' : 'Shop', url: `${SITE_URL}/pages/shop` },
                  { name: isArabic ? product.nameAr : product.name, url: `${SITE_URL}/pages/product/${product._id}` },
                ])
              ),
            }}
          />
        </>
      )}
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-linear-to-b from-gray-50 to-white'}`}>
      {/* Breadcrumb */}
      <div className={`border-b ${isDarkMode ? 'bg-[#23272F] border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className={`transition-colors ${isDarkMode ? 'text-white hover:text-[#B39E7A]' : 'hover:text-[#B39E7A]'}`}>{isArabic ? 'الرئيسية' : 'Home'}</Link>
            <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
            <Link href="/pages/shop" className={`transition-colors ${isDarkMode ? 'text-white hover:text-[#B39E7A]' : 'hover:text-[#B39E7A]'}`}>{isArabic ? 'المتجر' : 'Shop'}</Link>
            <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? product.nameAr : product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Details and Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductDetailsTabs product={product} />
          </div>
          <div className="lg:col-span-1">
            <ProductReviews product={product} />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
