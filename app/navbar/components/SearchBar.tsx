"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/pages/shop/hooks/useSearch";
import { SearchBarProps } from '../types/navbar.types';

export const SearchBar = ({ 
  isArabic, 
  isDarkMode,
  isMobile = false 
}: Omit<SearchBarProps, 'searchQuery' | 'setSearchQuery'>) => {
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
  const router = useRouter();
  const placeholder = isArabic ? 'ابحث عن المنتجات...' : 'Search products...';

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
    if (searchQuery.trim()) {
      router.push(`/pages/shop?search=${encodeURIComponent(searchQuery)}`);
      hideSuggestions();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  const handleSuggestionClick = () => {
    hideSuggestions();
  };
  
  return (
    <div ref={searchRef} className={`relative ${isMobile ? 'w-full' : 'w-full'}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className={`block w-full ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-2.5 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text ${
              isDarkMode 
                ? 'border-gray-600 bg-[#26292E] text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
            }`}
            placeholder={placeholder}
            dir={isArabic ? 'rtl' : 'ltr'}
          />
          
          <div className={`absolute inset-y-0 ${isArabic ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
            <svg className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className={`absolute inset-y-0 ${isArabic ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {loading && (
            <div className={`absolute inset-y-0 ${isArabic ? 'left-12 pl-3' : 'right-12 pr-3'} flex items-center`}>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#B39E7A]"></div>
            </div>
          )}
        </div>
      </form>

      {showSuggestions && searchResults.length > 0 && (
        <div className={`absolute top-full ${isArabic ? 'right-0' : 'left-0'} ${isMobile ? 'left-0 right-0' : 'left-0 right-0'} mt-1 ${isDarkMode ? 'bg-[#26292E] border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto`}>
          <div className="p-2">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 px-2`}>
              {searchResults.length} {isArabic ? 'اقتراح' : 'suggestion'}{searchResults.length !== 1 && !isArabic ? 's' : ''}
            </div>
            {searchResults.map((product) => (
              <Link
                key={product._id}
                href={`/pages/product/${product._id}`}
                onClick={handleSuggestionClick}
                className={`flex items-center p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-md transition-colors`}
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
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                    {isArabic ? product.nameAr : product.name}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
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
        <div className={`absolute top-full ${isArabic ? 'right-0' : 'left-0'} ${isMobile ? 'left-0 right-0' : 'left-0 right-0'} mt-1 ${isDarkMode ? 'bg-[#26292E] border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-50`}>
          <div className="p-4 text-center">
            <svg className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{isArabic ? `لا توجد منتجات لـ "${searchQuery}"` : `No products found for "${searchQuery}"`}</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{isArabic ? 'جرب كلمات مختلفة أو تحقق من الإملاء' : 'Try different keywords or check spelling'}</div>
          </div>
        </div>
      )}
    </div>
  );
};
