"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "../hooks/useSearch";
import { useTranslation } from '@/i18n';
import { Filters, FilterChangeHandler } from "../types";

interface SearchBarProps {
  filters: Filters;
  handleFilterChange: FilterChangeHandler;
}

export default function SearchBar({ filters, handleFilterChange }: SearchBarProps) {
  const { isArabic } = useTranslation();
  const {
    searchQuery,
    searchResults,
    loading,
    showSuggestions,
    handleSearchChange,
    clearSearch,
    hideSuggestions,
  } = useSearch();
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        hideSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hideSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("search", searchQuery);
    hideSuggestions();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearchChange(value);
  };

  const handleClear = () => {
    clearSearch();
    handleFilterChange("search", "");
  };

  const handleSuggestionClick = () => {
    hideSuggestions();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={isArabic ? 'ابحث عن المنتجات، العلامات التجارية، الفئات...' : 'Search products, brands, categories...'}
            className={`w-full px-4 py-3 text-sm border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39E7A] focus:border-transparent bg-white ${
              isArabic ? 'pr-12 pl-12' : 'pl-12 pr-12'
            }`}
          />
          
          <div className={`absolute inset-y-0 flex items-center ${
            isArabic ? 'right-0 pr-4' : 'left-0 pl-4'
          }`}>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute inset-y-0 flex items-center text-gray-400 hover:text-gray-600 ${
                isArabic ? 'left-0 pl-4' : 'right-0 pr-4'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {loading && (
            <div className={`absolute inset-y-0 flex items-center ${
              isArabic ? 'left-12 pl-4' : 'right-12 pr-4'
            }`}>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#B39E7A]"></div>
            </div>
          )}
        </div>
      </form>

      {showSuggestions && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">
              {searchResults.length} {isArabic ? 'اقتراح' : 'suggestion'}{searchResults.length !== 1 && !isArabic ? 's' : ''}
            </div>
            {searchResults.map((product) => (
              <Link
                key={product._id}
                href={`/pages/product/${product._id}`}
                onClick={handleSuggestionClick}
                className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className={`relative w-12 h-12 shrink-0 ${
                  isArabic ? 'ml-3' : 'mr-3'
                }`}>
                  <Image
                    src={product.mainImage}
                    alt={isArabic ? product.nameAr : product.name}
                    fill
                    className="object-cover rounded"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {isArabic ? product.nameAr : product.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {isArabic ? (product.categoryAr || product.category) : product.category} • {isArabic ? (product.brandAr || product.brand) : product.brand}
                  </div>
                  <div className="text-sm font-semibold text-[#B39E7A]">
                    {product.finalPrice} {isArabic ? 'جنيه' : 'EGP'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showSuggestions && searchQuery.length >= 2 && searchResults.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="text-sm">{isArabic ? `لا توجد منتجات لـ "${searchQuery}"` : `No products found for "${searchQuery}"`}</div>
            <div className="text-xs text-gray-400 mt-1">{isArabic ? 'جرب كلمات مختلفة أو تحقق من الإملاء' : 'Try different keywords or check spelling'}</div>
          </div>
        </div>
      )}
    </div>
  );
}