import { useState, useCallback, useEffect } from 'react';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9'
      });
      
      if (search.trim()) params.append('search', search.trim());
      if (category.trim()) params.append('category', category.trim());
      if (brand.trim()) params.append('brand', brand.trim());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, brand]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, category, brand, fetchProducts]);

  return {
    products,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    page,
    setPage,
    totalPages,
    fetchProducts
  };
};
