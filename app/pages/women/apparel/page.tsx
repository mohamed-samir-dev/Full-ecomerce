"use client";

import { useState, useEffect, useRef } from "react";
import { useApparelData } from "./hooks/useApparelData";
import Breadcrumb from "./components/Breadcrumb";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import Loading from "./components/Loading";

export default function ApparelPage() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const isInitialized = useRef(false);
  
  const { products, filterOptions, loading } = useApparelData(selectedSizes, selectedColors, priceRange);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      queueMicrotask(() => {
        setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
      });
    }
  }, [filterOptions.priceRange.min, filterOptions.priceRange.max]);

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    setter(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-10">
          <Filters
            filterOptions={filterOptions}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            priceRange={priceRange}
            onSizeToggle={(size) => toggleFilter(size, selectedSizes, setSelectedSizes)}
            onColorToggle={(color) => toggleFilter(color, selectedColors, setSelectedColors)}
            onPriceChange={(max: number) => setPriceRange([priceRange[0], max])}
          />
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
