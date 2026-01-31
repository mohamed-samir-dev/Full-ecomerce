"use client";

import { Filters, FilterChangeHandler } from "../types";

interface SortControlsProps {
  filters: Filters;
  handleFilterChange: FilterChangeHandler;
}

export default function SortControls({ filters, handleFilterChange }: SortControlsProps) {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "bestselling", label: "Best Selling" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600">
        Showing {filters.category.length > 0 ? "filtered" : "all"} products
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-xs sm:text-sm font-medium whitespace-nowrap text-gray-700">
          Sort by
        </label>
        <select
          id="sort"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border accent-[#C1B092] rounded-md flex-1 sm:flex-none min-w-0 bg-white text-black border-gray-300"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
