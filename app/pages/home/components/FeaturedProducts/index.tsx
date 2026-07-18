'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import FeaturedProductCard from './FeaturedProductCard';
import { Product } from '../../types/home.types';

const accentColor = '#C9A84C';
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export default function FeaturedProducts() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=8&sort=newest`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.success) setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const productCards = useMemo(() =>
    products.map((product, i) => (
      <motion.div
        key={product._id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.06 }}
      >
        <FeaturedProductCard product={product} />
      </motion.div>
    )), [products]
  );

  return (
    <section
      className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#141414]' : 'bg-[#F5F0EA]'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, ${accentColor} 0%, transparent 55%), radial-gradient(circle at 20% 80%, ${accentColor} 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border rounded-full px-4 py-1.5 mb-5"
            style={{ borderColor: `${accentColor}40` }}
          >
            <Sparkles size={12} style={{ color: accentColor }} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accentColor }}>
              {isArabic ? 'وصل حديثاً' : 'New Arrivals'}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('home.featuredProducts.title')}
          </h2>
          <div
            className="h-[2px] w-16 mx-auto mt-5"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
          />
        </motion.div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden animate-pulse ${isDarkMode ? 'bg-white/5' : 'bg-white/60'}`}>
                <div className={`aspect-square ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                <div className="p-4 space-y-2">
                  <div className={`h-3 rounded-full w-3/4 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                  <div className={`h-3 rounded-full w-1/2 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {productCards}
          </div>
        )}
      </div>
    </section>
  );
}
