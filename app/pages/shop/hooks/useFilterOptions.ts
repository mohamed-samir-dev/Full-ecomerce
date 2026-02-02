"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FilterOptions } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useFilterOptions() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    materials: [],
    shops: [],
    availability: [],
    priceRange: { minPrice: 0, maxPrice: 1000 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products/filter-options`);
        
        if (response.data.success) {
          setFilterOptions(response.data.data);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch filter options");
        console.error("Filter options error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { filterOptions, loading, error };
}