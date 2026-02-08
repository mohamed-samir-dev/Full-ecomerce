'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useTranslation } from '@/i18n';
import { Product } from '@/app/types/category';
import { ShoppingCart, Eye, Heart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  badgeText?: string;
  badgeTextAr?: string;
  badgeColor?: string;
}

export default function ProductGrid({ 
  products, 
  badgeText = 'NEW', 
  badgeTextAr = 'جديد',
  badgeColor = '#10b981'
}: ProductGridProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isArabic } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="text-center py-24" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-6xl mb-4 opacity-20">✨</div>
        <p className="text-gray-400 font-light text-lg mb-4">
          {isArabic ? 'لا توجد منتجات حالياً' : 'No products available'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product) => {
        const isWishlisted = isInWishlist(product._id);
        
        const handleWishlistToggle = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (isWishlisted) {
            removeFromWishlist(product._id);
          } else {
            addToWishlist({
              _id: product._id,
              name: product.name,
              mainImage: product.mainImage,
              basePrice: product.basePrice,
              finalPrice: product.finalPrice,
              stock: product.stock
            });
          }
        };

        return (
          <div
            key={product._id}
            className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 border border-transparent hover:border-amber-100 cursor-pointer group"
            onClick={() => router.push(`/pages/product/${product._id}`)}
          >
            <div className="aspect-3/4 relative overflow-hidden bg-gray-100">
              <Image
                src={product.mainImage || '/placeholder.png'}
                alt={isArabic ? (product.nameAr || product.name) : product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div 
                className={`absolute top-4 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                  isArabic ? 'left-4' : 'right-4'
                }`}
                style={{ backgroundColor: badgeColor }}
              >
                {isArabic ? badgeTextAr : badgeText}
              </div>
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all ${
                  isArabic ? 'right-4' : 'left-4'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
              </button>
            </div>

            <div className="p-5">
              <h3 className="font-light text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-[#B39E7A] transition-colors">
                {isArabic ? (product.nameAr || product.name) : product.name}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.averageRating || 0) ? 'text-amber-400' : 'text-gray-200'}`}>
                    ★
                  </span>
                ))}
                <span className="text-xs text-gray-400 ml-1">({product.totalReviews || 0})</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-[#B39E7A]">{product.finalPrice}</span>
                  <span className="text-sm text-gray-400">{isArabic ? 'جنيه' : 'EGP'}</span>
                  {product.basePrice > product.finalPrice && (
                    <span className="text-sm text-gray-400 line-through">{product.basePrice}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/pages/product/${product._id}`);
                    }}
                    className="w-10 h-10 bg-[#B39E7A] rounded-full flex items-center justify-center hover:bg-[#A08D6A] transition-all shadow-sm"
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={product.stock === 0 || product.availability === 'out_of_stock'}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                      product.stock === 0 || product.availability === 'out_of_stock'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#B39E7A] text-white hover:bg-[#A08D6A]'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
