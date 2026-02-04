"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import CategoryGrid from '@/app/components/CategoryGrid';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';

const categories = [
  { name: 'Apparel', image: '/images/men-apparel.avif', slug: 'apparel' },
  { name: 'Shoes', image: '/images/men-shoes.avif', slug: 'shoes' },
  { name: 'Bags', image: '/images/men-bags.avif', slug: 'bags' },
  { name: 'Accessories', image: '/images/men-accessories.avif', slug: 'accessories' }
];

export default function MenPage() {
  const { products, trendingProducts, loading } = useCategoryProducts('Men');
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner image="/images/men-page.avif" title="Elevate Your Style" description="Discover premium menswear that defines modern masculinity. From classic to contemporary." buttonText="Shop The Collection" buttonLink="/pages/men/collection" buttonColor="#1E3A8A" buttonHoverColor="#1E40AF" />
      <ProductSlider title="Fresh for the Season: New Arrivals" products={products} loading={loading} onAddToCart={addToCart} accentColor="#1E3A8A" />
      <ProductSlider title="What's Trending Now" products={trendingProducts} loading={loading} onAddToCart={addToCart} accentColor="#1E3A8A" />
      <CategoryGrid categories={categories} basePath="/pages/men" />
    </div>
  );
}
