"use client";

import HeroBanner from '@/app/components/HeroBanner';
import BrowseCategories from '@/app/components/BrowseCategories';
import ProductSlider from '@/app/components/ProductSlider';
import { useSubCategoryProducts } from '@/app/hooks/category/useSubCategoryProducts';
import { useCart } from '@/hooks/useCart';

const categories = [
  { image: '/images/formal-shoes.avif', title: 'Formal Shoes', link: '/pages/shoes/formal', size: 'large' as const },
  { image: '/images/summer sandals.avif', title: 'Summer sandals', link: '/pages/shoes/sandals', size: 'small' as const },
  { image: '/images/casualshoes (1).avif', title: 'Casual', link: '/pages/shoes/casual', size: 'small' as const },
  { image: '/images/sport-shoes.avif', title: 'Luxury sports shoes', link: '/pages/shoes/sports', size: 'large' as const },
];

export default function ShoesPage() {
  const { products, loading } = useSubCategoryProducts('Shoes', 7, 'Trending');
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner 
        image="/images/shoes-page.avif" 
        title="Step Into Style" 
        description="Discover the perfect pair for every occasion. From casual comfort to elegant sophistication." 
        buttonText="Shop Shoes" 
        buttonLink="/pages/shoes/collection" 
        buttonColor="#262425" 
        buttonHoverColor="#050505" 
      />
      <BrowseCategories categories={categories} />
      <ProductSlider 
        title="What's Trending Now" 
        products={products} 
        loading={loading} 
        onAddToCart={addToCart} 
        accentColor="#18020B" 
      />
    </div>
  );
}
