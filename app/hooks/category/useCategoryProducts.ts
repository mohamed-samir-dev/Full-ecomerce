import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/app/types/category';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function useCategoryProducts(category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [newArrivals, trending] = await Promise.all([
          axios.get(`${API_URL}/api/products`, {
            params: { category, limit: 10, sort: 'newest' }
          }),
          axios.get(`${API_URL}/api/products`, {
            params: { category, productType: 'Trending', limit: 8 }
          })
        ]);
        if (newArrivals.data.success) {
          setProducts(newArrivals.data.data.slice(0, 10));
        }
        if (trending.data.success) {
          setTrendingProducts(trending.data.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return { products, trendingProducts, loading };
}
