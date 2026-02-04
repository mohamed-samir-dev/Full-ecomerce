"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Product {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  finalPrice: number;
  basePrice: number;
  averageRating: number;
  totalReviews: number;
  availability: string;
  stock: number;
  subCategory?: string;
  category?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

interface FilterOptions {
  sizes: string[];
  colors: { name: string; hex: string }[];
  subCategories: string[];
  priceRange: { min: number; max: number };
}

interface CollectionPageProps {
  category?: string;
  subCategory?: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  bannerImage: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function CollectionPage({ category, subCategory, title, subtitle, subtitleColor = "#D26563", bannerImage, breadcrumbs }: CollectionPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sizes: [],
    colors: [],
    subCategories: [],
    priceRange: { min: 0, max: 10000 }
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const isInitialized = useRef(false);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        if (res.data.success) {
          const categoryProducts = res.data.data.filter((p: Product) =>
            subCategory 
              ? p.subCategory?.trim().toLowerCase() === subCategory.toLowerCase()
              : p.category?.trim().toLowerCase() === category?.toLowerCase()
          );
          
          setProducts(categoryProducts);
          
          const sizes = [...new Set(categoryProducts.flatMap((p: Product) => p.sizes || []))] as string[];
          const colors = Array.from(
            new Map(
              categoryProducts
                .flatMap((p: Product) => p.colors || [])
                .map((c: { name: string; hex: string }) => [c.name, c])
            ).values()
          ) as { name: string; hex: string }[];
          const subCategories = [...new Set(categoryProducts.map((p: Product) => p.subCategory).filter(Boolean))] as string[];
          const prices = categoryProducts.map((p: Product) => p.finalPrice);
          
          setFilterOptions({
            sizes,
            colors,
            subCategories,
            priceRange: {
              min: prices.length ? Math.min(...prices) : 0,
              max: prices.length ? Math.max(...prices) : 10000
            }
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory]);

  useEffect(() => {
    if (!isInitialized.current && filterOptions.priceRange.max > 0) {
      isInitialized.current = true;
      setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
    }
  }, [filterOptions.priceRange]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedSizes.length) {
      filtered = filtered.filter((p: Product) => 
        p.sizes?.some(s => selectedSizes.includes(s))
      );
    }
    
    if (selectedColors.length) {
      filtered = filtered.filter((p: Product) => 
        p.colors?.some(c => selectedColors.includes(c.name))
      );
    }
    
    if (selectedSubCategories.length) {
      filtered = filtered.filter((p: Product) => 
        selectedSubCategories.includes(p.subCategory || "")
      );
    }
    
    filtered = filtered.filter((p: Product) => 
      p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "newest":
        filtered.sort((a, b) => b._id.localeCompare(a._id));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedSizes, selectedColors, selectedSubCategories, priceRange, sortBy]);

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    setter(selected.includes(value) 
      ? selected.filter(v => v !== value) 
      : [...selected, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedSubCategories([]);
    setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B39E7A] absolute inset-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 sm:h-80 lg:h-96 bg-linear-to-r from-rose-100 to-amber-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image 
          src={bannerImage} 
          alt={title} 
          fill 
          className="object-cover" 
        />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl  lg:text-6xl font-bold mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-md sm:text-xl font-light  opacity-90" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-300">•</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-[#B39E7A] transition-colors">{crumb.label}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <aside className="w-full lg:w-80 lg:shrink-0">
            <div className="lg:sticky lg:top-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light text-gray-900">Filters</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-[#B39E7A] hover:text-[#A08D6A] transition-colors"
                >
                  Clear All
                </button>
              </div>

              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="lg:hidden w-full flex items-center text-black justify-between mb-6 pb-3 border-b border-gray-100"
              >
                <span className="font-medium">Show Filters</span>
                <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-8`}>
                {filterOptions.subCategories.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Category</h3>
                    <div className="space-y-2">
                      {filterOptions.subCategories.map(subCategory => (
                        <label key={subCategory} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSubCategories.includes(subCategory)}
                            onChange={() => toggleFilter(subCategory, selectedSubCategories, setSelectedSubCategories)}
                            className="w-4 h-4 text-[#B39E7A] border-gray-300 rounded focus:ring-[#B39E7A]"
                          />
                          <span className="ml-3 text-gray-700 capitalize">{subCategory}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {filterOptions.sizes.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedSizes.includes(size)
                              ? 'bg-[#B39E7A] text-white shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-amber-50 border border-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filterOptions.colors.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {filterOptions.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)}
                          className={`group relative w-10 h-10 rounded-full transition-all ${
                            selectedColors.includes(color.name)
                              ? 'ring-2 ring-[#B39E7A] ring-offset-2 scale-110'
                              : 'hover:scale-105'
                          }`}
                          title={color.name}
                        >
                          <span 
                            className="absolute inset-0 rounded-full border-2 border-white shadow-md" 
                            style={{ backgroundColor: color.hex }}
                          ></span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">Price</h3>
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B39E7A] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-700 mt-3">
                    <span className="bg-amber-50 px-3 py-1 rounded-full">{priceRange[0]} EGP</span>
                    <span className="bg-amber-50 px-3 py-1 rounded-full">{priceRange[1]} EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-500">
                <span className="text-2xl font-light text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B39E7A] focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map(product => (
                <Link key={product._id} href={`/pages/product/${product._id}`} className="group">
                  <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 border border-transparent hover:border-amber-100">
                    <div className="aspect-3/4 relative overflow-hidden bg-gray-100">
                      <Image 
                        src={product.mainImage} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      {product.basePrice > product.finalPrice && (
                        <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          -{Math.round((1 - product.finalPrice / product.basePrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-light text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-[#B39E7A] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(product.averageRating) ? 'text-amber-400' : 'text-gray-200'}`}>
                            ★
                          </span>
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.totalReviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-light text-[#B39E7A]">{product.finalPrice}</span>
                          <span className="text-sm text-gray-400">EGP</span>
                          {product.basePrice > product.finalPrice && (
                            <span className="text-sm text-gray-400 line-through">{product.basePrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { 
                              e.preventDefault(); 
                              router.push(`/pages/product/${product._id}`); 
                            }} 
                            className="w-10 h-10 bg-[#B39E7A] rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm"
                          >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            onClick={(e) => { 
                              e.preventDefault(); 
                              addToCart(product); 
                            }} 
                            className="w-10 h-10 bg-[#B39E7A] rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm"
                          >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <div className="text-6xl mb-4 opacity-20">✨</div>
                <p className="text-gray-400 font-light text-lg mb-4">No pieces match your selection</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-[#B39E7A] hover:text-[#A08D6A] font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
