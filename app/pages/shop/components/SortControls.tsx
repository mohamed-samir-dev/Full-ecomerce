"use client";

import { Filters, FilterChangeHandler } from "../types";
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

interface SortControlsProps {
  filters: Filters;
  handleFilterChange: FilterChangeHandler;
  totalProducts?: number;
}

export default function SortControls({ filters, handleFilterChange, totalProducts }: SortControlsProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  const sortOptions = [
    { value: "featured", label: isArabic ? 'مميز' : 'Featured' },
    { value: "newest", label: isArabic ? 'الأحدث' : 'Newest' },
    { value: "price_asc", label: isArabic ? 'السعر: من الأقل للأعلى' : 'Price: Low to High' },
    { value: "price_desc", label: isArabic ? 'السعر: من الأعلى للأقل' : 'Price: High to Low' },
    { value: "rating", label: isArabic ? 'الأعلى تقييماً' : 'Highest Rated' },
  ];

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <span className={`text-2xl font-light ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{totalProducts || 0}</span> {isArabic ? 'قطعة' : ((totalProducts || 0) === 1 ? 'piece' : 'pieces')}
      </p>
      <select
        value={filters.sortBy}
        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B39E7A] focus:border-transparent ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-black'
        }`}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
