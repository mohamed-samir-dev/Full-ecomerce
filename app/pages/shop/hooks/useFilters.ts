"use client";

import { useState } from "react";
import { Filters } from "../types";

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    category: [],
    priceRange: [0, 500],
    rating: [],
    brand: [],
    shop: [],
    exclusiveOnly: false,
    sortBy: "featured",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(true);

  const handleFilterChange = (key: keyof Filters, value: Filters[keyof Filters]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 500],
      rating: [],
      brand: [],
      shop: [],
      exclusiveOnly: false,
      sortBy: "featured",
    });
  };

  return {
    filters,
    showMobileFilters,
    showCategoryDropdown,
    setShowMobileFilters,
    setShowCategoryDropdown,
    handleFilterChange,
    handleArrayFilterChange,
    clearAllFilters,
  };
}
