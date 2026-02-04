"use client";

import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import CategoryGrid from '@/app/components/CategoryGrid';
import { useCategoryProducts } from '@/app/hooks/category/useCategoryProducts';

const categories = [
  { name: 'Apparel', image: '/images/kid-apparel.avif', slug: 'apparel' },
  { name: 'Shoes', image: '/images/shoes-kid.avif', slug: 'shoes' },
  { name: 'Bags', image: '/images/kid-bag.avif', slug: 'bags' },
  { name: 'Toys & Games', image: '/images/kid-toys.avif', slug: 'Toys & Games' }
];

export default function KidsPage() {
  const { products, loading } = useCategoryProducts('Kids');
  const { addToCart } = useCart();

  const apparelProducts = products.filter(p => p.subCategory?.toLowerCase() === 'apparel');
  const toysProducts = products.filter(p => p.subCategory?.toLowerCase().includes('toy'));

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner 
        image="/images/kid-page.webp" 
        title="Fun & Fashionable" 
        description="Discover playful styles and comfortable clothing designed for active kids. Quality meets adventure." 
        buttonText="Shop The Collection" 
        buttonLink="/pages/kids/collection" 
        buttonColor="#F59E0B" 
        buttonHoverColor="#D97706" 
      />
      <ProductSlider 
        title="Fresh for the Season: New Arrivals" 
        products={products} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#F59E0B" 
      />
      <ProductSlider 
        title="Dressed to Play: Apparel" 
        products={apparelProducts} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#F59E0B" 
      />
      <ProductSlider 
        title="Imagination Central: Toys & Games" 
        products={toysProducts} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#F59E0B" 
      />
      <CategoryGrid categories={categories} basePath="/pages/kids" />
    </div>
  );
}
