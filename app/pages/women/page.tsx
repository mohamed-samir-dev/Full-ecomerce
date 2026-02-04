"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import CategoryGrid from '@/app/components/CategoryGrid';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';

const categories = [
  { name: 'Apparel', image: '/images/clothes-clothing-shop.avif', slug: 'apparel' },
  { name: 'shoes', image: '/images/shoes.avif', slug: 'shoes' },
  { name: 'Bags', image: '/images/bag.avif', slug: 'bags' },
  { name: 'Accessories', image: '/images/accesory.avif', slug: 'accessories' },
  { name: 'Beauty', image: '/images/beouty.webp', slug: 'beauty' }
];

export default function WomenPage() {
  const { products, trendingProducts, loading } = useCategoryProducts('Women');
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner image="/images/women-page.avif" title="Discover Your Style" description="Explore the latest trends and timeless classics in women's fashion. Your next favorite outfit awaits." buttonText="Shop The Collection" buttonLink="/pages/women/collection" buttonColor="#C11069" buttonHoverColor="#6D093B" />
      <ProductSlider title="Fresh for the Season: New Arrivals" products={products} loading={loading} onAddToCart={addToCart} accentColor="#C11069" />
      <ProductSlider title="What's Trending Now" products={trendingProducts} loading={loading} onAddToCart={addToCart} accentColor="#C11069" />
      <CategoryGrid categories={categories} basePath="/pages/women" />
    </div>
  );
}
