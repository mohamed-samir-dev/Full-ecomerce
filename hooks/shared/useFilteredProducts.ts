import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Product } from '@/app/types/category';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const ITEMS_PER_PAGE = 9
;

interface FilterOptions {
  subCategory?: string;
  category?: string;
  productType?: string;
  discount?: number;
  thirdtype?: string;
  [key: string]: string | number | undefined;
}

export function useFilteredProducts(filterOptions: FilterOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`, {
          params: { limit: 100 }
        });
        
        if (response.data.success) {
          let filtered = response.data.data;
          
          if (filterOptions.subCategory) {
            filtered = filtered.filter((p: Product) => p.subCategory === filterOptions.subCategory);
          }
          
          if (filterOptions.category) {
            filtered = filtered.filter((p: Product) => p.category === filterOptions.category);
          }
          
          if (filterOptions.productType) {
            filtered = filtered.filter((p: Product) => p.productType === filterOptions.productType);
          }
          
          if (filterOptions.discount !== undefined) {
            filtered = filtered.filter((p: Product) => 
              p.discount?.type === 'percentage' && p.discount?.value >= filterOptions.discount!
            );
          }
          
          if (filterOptions.thirdtype) {
            filtered = filtered.filter((p: Product) => (p as Product & { thirdtype?: string }).thirdtype === filterOptions.thirdtype);
          }
          
          setProducts(filtered);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterOptions.subCategory, filterOptions.category, filterOptions.productType, filterOptions.discount, filterOptions.thirdtype]);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter((c): c is string => Boolean(c)));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = selectedCategory === 'all' 
      ? products 
      : products.filter(p => p.category === selectedCategory);

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.finalPrice - b.finalPrice;
        case 'price-high':
          return b.finalPrice - a.finalPrice;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    products: paginatedProducts,
    loading,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    categories,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
    totalProducts: filteredAndSortedProducts.length
  };
}
