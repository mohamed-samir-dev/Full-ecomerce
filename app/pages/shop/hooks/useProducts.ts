"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product, Filters, ProductsResponse } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useProducts(filters: Filters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params: any = {
          page: 1,
          limit: 20,
        };
        
        // Add filters to params
        if (filters.category.length > 0) params.category = filters.category.join(',');
        if (filters.brand.length > 0) params.brand = filters.brand.join(',');
        if (filters.sizes.length > 0) params.sizes = filters.sizes.join(',');
        if (filters.colors.length > 0) params.colors = filters.colors.join(',');
        if (filters.availability.length > 0) params.availability = filters.availability.join(',');
        if (filters.material.length > 0) params.material = filters.material.join(',');
        if (filters.shop.length > 0) params.shop = filters.shop.join(',');
        if (filters.rating.length > 0) params.rating = filters.rating.join(',');
        if (filters.search) params.search = filters.search;
        if (filters.exclusiveOnly) params.exclusiveOnly = 'true';
        
        // Price range
        if (filters.priceRange[0] > 0) params.minPrice = filters.priceRange[0];
        if (filters.priceRange[1] < 1000) params.maxPrice = filters.priceRange[1];
        
        // Sort
        if (filters.sortBy) params.sort = filters.sortBy;

        const response = await axios.get(`${API_URL}/api/products`, { params });
        
        if (response.data.success) {
          const data: ProductsResponse = response.data;
          setProducts(data.data);
          setTotalProducts(data.totalProducts);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        }
        
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Products fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { 
    products, 
    loading, 
    error, 
    totalProducts, 
    totalPages, 
    currentPage 
  };
}
