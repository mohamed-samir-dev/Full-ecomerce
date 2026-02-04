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

interface CategoryPageProps {
  category: string;
  subCategory: string;
  title: string;
  description: string;
}

interface FilterOptions {
  sizes: string[];
  colors: { name: string; hex: string }[];
  priceRange: { min: number; max: number };
}

export default function CategoryPage({ category, subCategory, title, description }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ sizes: [], colors: [], priceRange: { min: 0, max: 10000 } });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const isInitialized = useRef(false);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        if (res.data.success) {
          let filtered = res.data.data.filter((p: Product) =>
            p.subCategory?.trim().toLowerCase() === subCategory.toLowerCase() &&
            p.category?.trim().toLowerCase() === category.toLowerCase()
          );
          if (selectedSizes.length) filtered = filtered.filter((p: Product) => p.sizes?.some(s => selectedSizes.includes(s)));
          if (selectedColors.length) filtered = filtered.filter((p: Product) => p.colors?.some(c => selectedColors.includes(c.name)));
          filtered = filtered.filter((p: Product) => p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]);
          setProducts(filtered);

          const all = res.data.data.filter((p: Product) =>
            p.subCategory?.trim().toLowerCase() === subCategory.toLowerCase() &&
            p.category?.trim().toLowerCase() === category.toLowerCase()
          );
          const sizes = [...new Set(all.flatMap((p: Product) => p.sizes || [] as string[]))] as string[];
          const colors = Array.from(new Map(all.flatMap((p: Product) => p.colors || [] as { name: string; hex: string }[]).map((c: { name: string; hex: string }): [string, { name: string; hex: string }] => [c.name, c])).values()) as { name: string; hex: string }[];
          const prices = all.map((p: Product) => p.finalPrice);
          setFilterOptions({ sizes, colors, priceRange: { min: prices.length ? Math.min(...prices) : 0, max: prices.length ? Math.max(...prices) : 10000 } });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, subCategory, selectedSizes, selectedColors, priceRange]);

  useEffect(() => {
    if (!isInitialized.current && filterOptions.priceRange.max > 0) {
      isInitialized.current = true;
      setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
    }
  }, [filterOptions.priceRange]);

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    setter(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="relative"><div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B39E7A] absolute inset-0"></div></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-[#B39E7A] transition-colors">Home</Link>
            <span className="text-gray-300">•</span>
            <Link href={`/pages/${category.toLowerCase()}`} className="hover:text-[#B39E7A] transition-colors">{category}</Link>
            <span className="text-gray-300">•</span>
            <span className="text-gray-900 font-medium">{subCategory}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-2 sm:mb-3 tracking-tight">{title}</h1>
          <p className="text-gray-600 text-base sm:text-lg font-light max-w-2xl">{description}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <aside className="w-full lg:w-72 lg:shrink-0">
            <div className="lg:sticky lg:top-4 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden w-full flex items-center justify-between mb-6 pb-3 text-black border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-light text-gray-900">Refine</h2>
                <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <h2 className="hidden lg:block text-lg sm:text-xl font-light text-gray-900 mb-6 sm:mb-8 pb-3 border-b border-gray-100">Refine</h2>
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                {filterOptions.sizes?.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.sizes.map(size => (
                        <button key={size} onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${selectedSizes.includes(size) ? 'bg-[#B39E7A] text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-amber-50 border border-gray-200'}`}>{size}</button>
                      ))}
                    </div>
                  </div>
                )}
                {filterOptions.colors?.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Color</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {filterOptions.colors.map((color) => (
                        <button key={color.name} onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)} className={`group relative w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all ${selectedColors.includes(color.name) ? 'ring-2 ring-[#B39E7A] ring-offset-2 scale-110' : 'hover:scale-105'}`} title={color.name}>
                          <span className="absolute inset-0 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: color.hex }}></span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Price</h3>
                  <input type="range" min={filterOptions.priceRange.min} max={filterOptions.priceRange.max} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B39E7A] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer" />
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-700 mt-3">
                    <span className="bg-amber-50 px-2 sm:px-3 py-1 rounded-full">{priceRange[0]} EGP</span>
                    <span className="bg-amber-50 px-2 sm:px-3 py-1 rounded-full">{priceRange[1]} EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500 font-light"><span className="text-xl sm:text-2xl font-light text-gray-900">{products.length}</span> {products.length === 1 ? 'piece' : 'pieces'}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.map(product => (
                <Link key={product._id} href={`/pages/product/${product._id}`} className="group">
                  <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 border border-transparent hover:border-amber-100">
                    <div className="aspect-3/4 relative overflow-hidden bg-gray-100">
                      <Image src={product.mainImage} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      {product.basePrice > product.finalPrice && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-rose-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg">-{Math.round((1 - product.finalPrice / product.basePrice) * 100)}%</div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="font-light text-gray-900 mb-2 line-clamp-2 text-base sm:text-lg group-hover:text-[#B39E7A] transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs sm:text-sm ${i < Math.floor(product.averageRating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.totalReviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5 sm:gap-2">
                          <span className="text-xl sm:text-2xl font-light text-[#B39E7A]">{product.finalPrice}</span>
                          <span className="text-xs sm:text-sm text-gray-400">EGP</span>
                          {product.basePrice > product.finalPrice && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">{product.basePrice}</span>
                          )}
                        </div>
                        <div className="flex gap-1.5 sm:gap-2">
                          <button onClick={(e) => { e.preventDefault(); router.push(`/pages/product/${product._id}`); }} className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer bg-[#B39E7A] rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={(e) => { e.preventDefault(); addToCart(product); }} className="w-9 h-9 sm:w-10 sm:h-10 bg-[#B39E7A] cursor-pointer rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-16 sm:py-24">
                <div className="text-5xl sm:text-6xl mb-4 opacity-20">✨</div>
                <p className="text-gray-400 font-light text-base sm:text-lg">No pieces match your selection</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
