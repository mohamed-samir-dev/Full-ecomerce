"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Product } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced search function
  const debouncedSearchRef = useRef<((query: string) => void) | null>(null);

  const performSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Searching for:', query);
      const response = await axios.get(`${API_URL}/api/products/search`, {
        params: { q: query, limit: 8 }
      });
      console.log('Search response:', response.data);

      if (response.data.success) {
        setSearchResults(response.data.data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (!debouncedSearchRef.current) {
    debouncedSearchRef.current = debounce(performSearch, 300);
  }

  useEffect(() => {
    debouncedSearchRef.current?.(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
  };

  return {
    searchQuery,
    searchResults,
    loading,
    showSuggestions,
    handleSearchChange,
    clearSearch,
    hideSuggestions,
  };
}

// Debounce utility function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}