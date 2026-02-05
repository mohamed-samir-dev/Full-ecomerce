"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import BrowseCategories from '@/app/components/BrowseCategories';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';
import Image from 'next/image';

export default function PetSuppliesPage() {
  const { products, trendingProducts, loading } = useCategoryProducts('pet');
  const { addToCart } = useCart();
  const categories = [
    { image: '/images/Toy.avif', title: 'Toys', link: '/pages/PetSupplies/toys', size: 'large' as const },
    { image: '/images/Care.avif', title: ' Grooming & Care', link: '/pages/PetSupplies/care', size: 'small' as const },
    { image: '/images/Beds.avif', title: 'Beds & Furniture', link: '/pages/PetSupplies/beds', size: 'small' as const },
    { image: '/images/Food & Treats.avif', title: 'Food & Treats', link: '/pages/PetSupplies/food', size: 'large' as const },
  ];
  
  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner image="/images/pet-page.webp" title="For your most loyal companion" description="Luxury products carefully selected to pamper your pet" buttonText="Shop now" buttonLink="/pages/PetSupplies/collection" buttonColor="#839A7E" buttonHoverColor="#61755C" />
      
      <div className="w-full py-12 sm:py-16 bg-[#F7F3ED] ">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <div className="md:w-2/5">
              <Image src="/images/still-life-pet-food-composition.avif" alt="Pet products" width={600} height={400} className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="md:w-1/2 space-y-6 md:mt-8">
              <div className="inline-block bg-[#839A7E] text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">Premium Quality</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#493B30] leading-tight">Quality First</h2>
              <p className="text-lg text-[#746C5F] leading-relaxed">We believe in using the finest organic ingredients and sustainable materials to ensure your pet&rsquo;s health and happiness while respecting the environment.</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-[#493B30] font-medium">100% Organic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-[#493B30] font-medium">Eco-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-[#493B30] font-medium">Vet Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrowseCategories categories={categories} buttonBgColor="#839A7E" buttonTextColor="#FFFFFF" buttonHoverColor="#61755C" />
      <ProductSlider title="New for Your Pet" products={products} loading={loading} onAddToCart={addToCart} accentColor="#839A7E" />
      <ProductSlider title="Trending for Pets" products={trendingProducts} loading={loading} onAddToCart={addToCart} accentColor="#839A7E" />
    </div>
  );}
