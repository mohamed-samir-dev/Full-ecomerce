import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/app/types/category';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function useSubCategoryProducts(subCategory: string, limit: number = 7, productType?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: { subCategory: string; limit: number; sort: string; productType?: string } = { subCategory, limit, sort: 'random' };
        if (productType) params.productType = productType;
        
        const response = await axios.get(`${API_URL}/api/products`, { params });
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subCategory, limit, productType]);

  return { products, loading };
}
