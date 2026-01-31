"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '../../shop/types';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/info/ProductInfo';
import ProductDetailsTabs from './components/ProductDetailsTabs';
import ProductReviews from './components/ProductReviews';

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${params.id}`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-8">The product you&rsquo;re looking for doesn&rsquo;t exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-[#B39E7A] text-white rounded-lg font-medium hover:bg-[#A08B6F]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <ProductDetailsTabs product={product} />
          </div>
          <div className="lg:col-span-1">
            <ProductReviews product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
