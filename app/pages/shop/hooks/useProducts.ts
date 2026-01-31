"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product, Filters } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useProducts(filters: Filters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products`, {
          params: {
            category: filters.category.join(","),
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
            brand: filters.brand.join(","),
            sort:
              filters.sortBy === "price-low"
                ? "price_asc"
                : filters.sortBy === "price-high"
                  ? "price_desc"
                  : filters.sortBy,
          },
        });

        let filteredProducts = response.data.data || [];

        // Apply rating filter client-side
        if (filters.rating.length > 0) {
          filteredProducts = filteredProducts.filter((p: Product) =>
            filters.rating.includes(Math.floor(p.averageRating).toString()),
          );
        }

        // Apply shop filter
        if (filters.shop.length > 0) {
          filteredProducts = filteredProducts.filter((p: Product) =>
            filters.shop.includes(p.shop),
          );
        }

        // Apply exclusive products filter
        if (filters.exclusiveOnly) {
          filteredProducts = filteredProducts.filter(
            (p: Product) => p.isExclusive,
          );
        }

        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading, error };
}
