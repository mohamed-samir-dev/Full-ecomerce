"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from './components/HeroBanner';
import ProductSlider from './components/ProductSlider';
import CategoryGrid from './components/CategoryGrid';
import { useProducts } from './hooks/useProducts';

export default function WomenPage() {
  const { products, trendingProducts, loading } = useProducts();
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner />
      <ProductSlider title="Fresh for the Season: New Arrivals" products={products} loading={loading} onAddToCart={addToCart} />
      <ProductSlider title="What's Trending Now" products={trendingProducts} loading={loading} onAddToCart={addToCart} />
      <CategoryGrid />
    </div>
  );
}
