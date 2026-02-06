"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import HeroBanner from '@/app/components/HeroBanner';
import BrowseCategories from '@/app/components/BrowseCategories';
import ProductSlider from '@/app/components/ProductSlider';
import { useTranslation } from '@/i18n';

export default function AccessoriesPage() {
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const categories = [
    { image: '/images/Silk and scarves.avif', title: t('accessories.category.silk'), link: '/pages/accessories/silk', size: 'small' as const },
    { image: '/images/watch.avif', title: t('accessories.category.watches'), link: '/pages/accessories/watches', size: 'large' as const },
    { image: '/images/glassess.avif', title: t('accessories.category.sunglasses'), link: '/pages/accessories/sunglasses', size: 'large' as const },
    { image: '/images/luxurious-shiny-golden-chain.avif', title: t('accessories.category.jewelry'), link: '/pages/accessories/jewelry', size: 'small' as const },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const [newArrivals, trending] = await Promise.all([
          fetch(`${API_URL}/api/products?subCategory=Accessories&limit=10&sort=newest`),
          fetch(`${API_URL}/api/products?subCategory=Accessories&productType=Trending&limit=8`)
        ]);
        const newArrivalsData = await newArrivals.json();
        const trendingData = await trending.json();
        
        if (newArrivalsData.success) setProducts(newArrivalsData.data);
        if (trendingData.success) setTrendingProducts(trendingData.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner 
        image="/images/accessory.avif" 
        title={t('accessories.hero.title')} 
        description={t('accessories.hero.description')} 
        buttonText={t('accessories.hero.button')} 
        buttonLink="/pages/accessories/collection" 
        buttonColor="#C1883E" 
        buttonHoverColor="#E0C49F"
        titleColor="#C1883E"
      />
      <BrowseCategories categories={categories} />
      <ProductSlider title={t('accessories.newArrivals.title')} products={products} loading={loading} onAddToCart={addToCart} accentColor="#C1883E" />
      <ProductSlider title={t('accessories.trending.title')} products={trendingProducts} loading={loading} onAddToCart={addToCart} accentColor="#C1883E" />
    </div>
  );
}
