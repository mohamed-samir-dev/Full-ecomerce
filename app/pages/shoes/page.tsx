"use client";

import HeroBanner from '@/app/components/HeroBanner';
import ProductSlider from '@/app/components/ProductSlider';
import { useSubCategoryProducts } from '@/app/hooks/category/useSubCategoryProducts';
import { useCart } from '@/hooks/useCart';

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
      
      <div className="max-w-[1400px] mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="col-span-2 h-64 bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: "url('/images/formal-shoes.avif')"}}>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                <p className="text-white text-2xl font-bold">Formal Shoes</p>
                <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Discover More</button>
              </div>
            </div>
            <div className="h-48 bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: "url('/images/summer sandals.avif')"}}>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                <p className="text-white text-xl font-bold">Summer sandals</p>
                <button className="bg-white text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition text-sm">Discover More</button>
              </div>
            </div>
            <div className="h-48 bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: "url('/images/casualshoes (1).avif')"}}>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                <p className="text-white text-xl font-bold">Casual</p>
                <button className="bg-white text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition text-sm">Discover More</button>
              </div>
            </div>
          </div>
          <div className="h-64 lg:h-full bg-cover bg-center rounded-2xl relative overflow-hidden" style={{backgroundImage: "url('/images/sport-shoes.avif')"}}>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-3xl font-bold">Luxury sports shoes</p>
              <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Discover More</button>
            </div>
          </div>
        </div>
      </div>

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
