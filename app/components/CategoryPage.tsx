"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Product {
  _id: string;
  name: string;
  nameAr: string;
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
  secondtype?: string;
  thirdtype?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

interface CategoryPageProps {
  category?: string;
  subCategory: string;
  secondtype?: string;
  thirdtype?: string;
  title: string;
  description: string;
}

interface FilterOptions {
  sizes: string[];
  colors: { name: string; hex: string }[];
  priceRange: { min: number; max: number };
}

export default function CategoryPage({ category, subCategory, secondtype, thirdtype, title, description }: CategoryPageProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ sizes: [], colors: [], priceRange: { min: 0, max: 100000 } });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useCart();
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?limit=1000`);
        if (res.data.success) {
          const all = res.data.data.filter((p: Product) =>
            p.subCategory?.trim().toLowerCase() === subCategory.toLowerCase() &&
            (!category || p.category?.trim().toLowerCase() === category.toLowerCase()) &&
            (!secondtype || p.secondtype?.trim().toLowerCase() === secondtype.toLowerCase()) &&
            (!thirdtype || p.thirdtype?.trim().toLowerCase() === thirdtype.toLowerCase())
          );
          console.log('All products found:', all.length);
          setAllProducts(all);
          setProducts(all);
          
          const sizes = [...new Set(all.flatMap((p: Product) => p.sizes || [] as string[]))] as string[];
          const colors = Array.from(new Map(all.flatMap((p: Product) => p.colors || [] as { name: string; hex: string }[]).map((c: { name: string; hex: string }): [string, { name: string; hex: string }] => [c.name, c])).values()) as { name: string; hex: string }[];
          const prices = all.map((p: Product) => p.finalPrice);
          const maxPrice = prices.length ? Math.max(...prices) : 1000000;
          console.log('Price range - min:', Math.min(...prices), 'max:', maxPrice);
          setFilterOptions({ sizes, colors, priceRange: { min: prices.length ? Math.min(...prices) : 0, max: maxPrice } });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, subCategory, secondtype, thirdtype]);

  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered = allProducts;
    if (selectedSizes.length) filtered = filtered.filter((p: Product) => p.sizes?.some(s => selectedSizes.includes(s)));
    if (selectedColors.length) filtered = filtered.filter((p: Product) => p.colors?.some(c => selectedColors.includes(c.name)));
    if (priceRange && priceRange[1] < filterOptions.priceRange.max) {
      filtered = filtered.filter((p: Product) => p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]);
    }
    setProducts(filtered);
  }, [allProducts, selectedSizes, selectedColors, priceRange, filterOptions.priceRange.max]);

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(null);
  };

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    setter(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);
  };

  if (loading) return <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}><div className="relative"><div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B39E7A] absolute inset-0"></div></div></div>;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
      <div className={`border-b ${isDarkMode ? 'bg-[#23272F] border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <Link href="/" className={`transition-colors ${isDarkMode ? 'text-white hover:text-[#B39E7A]' : 'hover:text-[#B39E7A]'}`}>{isArabic ? 'الرئيسية' : 'Home'}</Link>
            {category && (
              <>
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-300'}>•</span>

                <Link href={`/pages/${category.toLowerCase() === 'pet' ? 'PetSupplies' : category.toLowerCase()}`} className={`transition-colors ${isDarkMode ? 'text-white hover:text-[#B39E7A]' : 'hover:text-[#B39E7A]'}`}>
                  {isArabic ? (
                    category.toLowerCase() === 'women' ? 'نساء' :
                    category.toLowerCase() === 'men' ? 'رجال' :
                    category.toLowerCase() === 'kids' ? 'أطفال' :
                    category.toLowerCase() === 'pet' ? 'حيوانات أليفة' :
                    category.toLowerCase() === 'shoes' ? 'أحذية' :
                    category.toLowerCase() === 'accessories' ? 'إكسسوارات' :
                    category.toLowerCase() === 'electronics' ? 'إلكترونيات' :
                    category
                  ) : category}
                </Link>
              </>
            )}
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-300'}>•</span>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? (
                category === 'men' && subCategory.toLowerCase() === 'apparel' ? 'ملابس' :
                category === 'men' && subCategory.toLowerCase() === 'shoes' ? 'أحذية' :
                category === 'men' && subCategory.toLowerCase() === 'bags' ? 'حقائب' :
                category === 'men' && subCategory.toLowerCase() === 'accessories' ? 'إكسسوارات' :
                category === 'women' && subCategory.toLowerCase() === 'apparel' ? 'ملابس' :
                category === 'women' && subCategory.toLowerCase() === 'shoes' ? 'أحذية' :
                category === 'women' && subCategory.toLowerCase() === 'bags' ? 'حقائب' :
                category === 'women' && subCategory.toLowerCase() === 'accessories' ? 'إكسسوارات' :
                category === 'women' && subCategory.toLowerCase() === 'beauty' ? 'جمال' :
                category === 'kids' && subCategory.toLowerCase() === 'toys & games' ? 'ألعاب وألعاب ترفيهية' :
                category === 'kids' && subCategory.toLowerCase() === 'apparel' ? 'ملابس' :
                category === 'kids' && subCategory.toLowerCase() === 'shoes' ? 'أحذية' :
                category === 'kids' && subCategory.toLowerCase() === 'bags' ? 'حقائب' :
                category === 'pet' && subCategory.toLowerCase() === 'beds' ? 'أسرة' :
                category === 'pet' && subCategory.toLowerCase() === 'care' ? 'العناية' :
                category === 'pet' && subCategory.toLowerCase() === 'food' ? 'طعام' :
                category === 'pet' && subCategory.toLowerCase() === 'toys' ? 'ألعاب' :
                category === 'electronics' && subCategory.toLowerCase() === 'audio' ? 'صوتيات' :
                category === 'electronics' && subCategory.toLowerCase() === 'smarthome' ? 'منزل ذكي' :
                category === 'electronics' && subCategory.toLowerCase() === 'personaltech' ? 'تقنية شخصية' :
                category === 'electronics' && subCategory.toLowerCase() === 'cameras' ? 'تصوير' :
                subCategory.toLowerCase() === 'shoes' && secondtype === 'formal' ? 'أحذية رسمية' :
                subCategory.toLowerCase() === 'shoes' && secondtype === 'summer' ? 'صنادل صيفية' :
                subCategory.toLowerCase() === 'shoes' && secondtype === 'casual' ? 'عادي' :
                subCategory.toLowerCase() === 'shoes' && secondtype === 'athlete' ? 'أحذية رياضية' :
                subCategory.toLowerCase() === 'accessories' && secondtype === 'Jewelry' ? 'مجوهرات' :
                subCategory.toLowerCase() === 'accessories' && secondtype === 'Silk' ? 'حرير وأوشحة' :
                subCategory.toLowerCase() === 'accessories' && secondtype === 'Sunglasses' ? 'نظارات شمسية' :
                subCategory.toLowerCase() === 'accessories' && secondtype === 'Watches' ? 'ساعات' :
                subCategory
              ) : (secondtype || subCategory)}
            </span>
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-2 sm:mb-3 tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h1>
          <p className={`text-base sm:text-lg font-light max-w-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <aside className="w-full lg:w-72 lg:shrink-0">
            <div className={`lg:sticky lg:top-4 border rounded-2xl p-4 sm:p-6 shadow-sm ${isDarkMode ? 'bg-[#23272F] border-gray-700' : 'bg-white border-gray-200'}`}>
              <button onClick={() => setShowFilters(!showFilters)} className={`lg:hidden w-full flex items-center justify-between mb-6 pb-3 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-black border-gray-100'}`}>
                <h2 className={`text-lg sm:text-xl font-light ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('filter.refine')}</h2>
                <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <h2 className={`hidden lg:block text-lg sm:text-xl font-light mb-6 sm:mb-8 pb-3 border-b ${isDarkMode ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-100'}`}>{t('filter.refine')}</h2>
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                {(selectedSizes.length > 0 || selectedColors.length > 0 || priceRange) && (
                  <button onClick={clearFilters} className="w-full mb-4 px-4 py-2 text-sm text-[#B39E7A] border border-[#B39E7A] rounded-full hover:bg-[#B39E7A] hover:text-white transition-all">
                    {isArabic ? 'مسح الكل' : 'Clear All'}
                  </button>
                )}
                {filterOptions.sizes?.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className={`font-medium mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('filter.size')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.sizes.map(size => (
                        <button key={size} onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${selectedSizes.includes(size) ? 'bg-[#B39E7A] text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-amber-50 border border-gray-200'}`}>{size}</button>
                      ))}
                    </div>
                  </div>
                )}
                {filterOptions.colors?.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className={`font-medium mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('filter.color')}</h3>
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
                  <h3 className={`font-medium mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('filter.price')}</h3>
                  <input 
                    type="range" 
                    min={filterOptions.priceRange.min} 
                    max={filterOptions.priceRange.max} 
                    value={priceRange?.[1] ?? filterOptions.priceRange.max} 
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      setPriceRange([filterOptions.priceRange.min, newMax]);
                    }} 
                    className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B39E7A] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer" 
                  />
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-700 mt-3">
                    <span className="bg-amber-50 px-2 sm:px-3 py-1 rounded-full">{filterOptions.priceRange.min} {t('product.egp')}</span>
                    <span className="bg-amber-50 px-2 sm:px-3 py-1 rounded-full">{priceRange?.[1] ?? filterOptions.priceRange.max} {t('product.egp')}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500 font-light"><span className={`text-xl sm:text-2xl font-light ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{products.length}</span> {products.length === 1 ? t('filter.piece') : t('filter.pieces')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.map(product => (
                <Link key={product._id} href={`/pages/product/${product._id}`} className="group">
                  <div className={`rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border ${
                    isDarkMode ? 'bg-[#23272F] hover:shadow-gray-900/50 border-gray-700 hover:border-gray-600' : 'bg-white hover:shadow-amber-100/50 border-transparent hover:border-amber-100'
                  }`}>
                    <div className="aspect-3/4 relative overflow-hidden bg-gray-100">
                      <Image src={product.mainImage} alt={isArabic ? product.nameAr : product.name} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={75} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      {product.basePrice > product.finalPrice && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-rose-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg">-{Math.round((1 - product.finalPrice / product.basePrice) * 100)}%</div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className={`font-light mb-2 line-clamp-2 text-base sm:text-lg group-hover:text-[#B39E7A] transition-colors ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>{isArabic ? product.nameAr : product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs sm:text-sm ${i < Math.floor(product.averageRating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.totalReviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5 sm:gap-2">
                          <span className="text-xl sm:text-2xl font-light text-[#B39E7A]">{product.finalPrice}</span>
                          <span className="text-xs sm:text-sm text-gray-400">{t('product.egp')}</span>
                          {product.basePrice > product.finalPrice && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">{product.basePrice}</span>
                          )}
                        </div>
                        <div className="flex gap-1.5 sm:gap-2">
                          <button onClick={(e) => { e.preventDefault(); router.push(`/pages/product/${product._id}`); }} className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer bg-[#B39E7A] rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm" aria-label="View product details">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={(e) => { e.preventDefault(); addToCart(product); }} className="w-9 h-9 sm:w-10 sm:h-10 bg-[#B39E7A] cursor-pointer rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm" aria-label="Add to cart">
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
                <p className="text-gray-400 font-light text-base sm:text-lg">{t('filter.noMatch')}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
