"use client";

import { Filters, FilterChangeHandler } from "../types";
import SearchBar from "./SearchBar";

interface SortControlsProps {
  filters: Filters;
  handleFilterChange: FilterChangeHandler;
  totalProducts?: number;
}

export default function SortControls({ filters, handleFilterChange, totalProducts }: SortControlsProps) {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-sm text-gray-500">
        <span className="text-2xl font-light text-gray-900">{totalProducts || 0}</span> {(totalProducts || 0) === 1 ? 'piece' : 'pieces'}
      </p>
      <select
        value={filters.sortBy}
        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        className="px-4 py-2 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B39E7A] focus:border-transparent"
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
