"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filters } from "../types";

const defaultFilters: Filters = {
  category: [],
  priceRange: [0, 1000],
  rating: [],
  brand: [],
  sizes: [],
  colors: [],
  availability: [],
  material: [],
  shop: [],
  exclusiveOnly: false,
  sortBy: "newest",
  search: "",
};

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(true);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);

  // Load filters from URL on mount
  useEffect(() => {
    const urlFilters: Partial<Filters> = {};
    
    // Parse array filters
    const arrayFilters = ['category', 'rating', 'brand', 'sizes', 'colors', 'availability', 'material', 'shop'];
    arrayFilters.forEach(key => {
      const value = searchParams.get(key);
      if (value) {
        urlFilters[key as keyof Filters] = value.split(',') as any;
      }
    });
    
    // Parse price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      urlFilters.priceRange = [
        minPrice ? parseInt(minPrice) : 0,
        maxPrice ? parseInt(maxPrice) : 1000
      ];
    }
    
    // Parse boolean filters
    const exclusiveOnly = searchParams.get('exclusiveOnly');
    if (exclusiveOnly) {
      urlFilters.exclusiveOnly = exclusiveOnly === 'true';
    }
    
    // Parse string filters
    const sortBy = searchParams.get('sortBy');
    const search = searchParams.get('search');
    if (sortBy) urlFilters.sortBy = sortBy;
    if (search) urlFilters.search = search;
    
    setFilters(prev => ({ ...prev, ...urlFilters }));
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (newFilters: Filters) => {
    const params = new URLSearchParams();
    
    // Add array filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (key === 'priceRange' && Array.isArray(value)) {
        if (value[0] > 0) params.set('minPrice', value[0].toString());
        if (value[1] < 1000) params.set('maxPrice', value[1].toString());
      } else if (key === 'exclusiveOnly' && value === true) {
        params.set(key, 'true');
      } else if (key === 'sortBy' && value !== 'newest') {
        params.set(key, value as string);
      } else if (key === 'search' && value) {
        params.set(key, value as string);
      }
    });
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  const handleFilterChange = (key: keyof Filters, value: Filters[keyof Filters]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleArrayFilterChange = (key: keyof Filters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    
    const newFilters = { ...filters, [key]: newArray };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    router.push(window.location.pathname, { scroll: false });
  };

  const hasActiveFilters = () => {
    return (
      filters.category.length > 0 ||
      filters.rating.length > 0 ||
      filters.brand.length > 0 ||
      filters.sizes.length > 0 ||
      filters.colors.length > 0 ||
      filters.availability.length > 0 ||
      filters.material.length > 0 ||
      filters.shop.length > 0 ||
      filters.exclusiveOnly ||
      filters.search.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 1000
    );
  };

  return {
    filters,
    showMobileFilters,
    showCategoryDropdown,
    showBrandDropdown,
    showSizeDropdown,
    showColorDropdown,
    showAvailabilityDropdown,
    showMaterialDropdown,
    showShopDropdown,
    setShowMobileFilters,
    setShowCategoryDropdown,
    setShowBrandDropdown,
    setShowSizeDropdown,
    setShowColorDropdown,
    setShowAvailabilityDropdown,
    setShowMaterialDropdown,
    setShowShopDropdown,
    handleFilterChange,
    handleArrayFilterChange,
    clearAllFilters,
    hasActiveFilters,
  };
}
