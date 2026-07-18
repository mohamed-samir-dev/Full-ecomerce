'use client';

import Image from 'next/image';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useRouter } from 'next/navigation';
import { FeaturedProductCardProps } from '../../types/home.types';

const accentColor = '#C9A84C';
const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const isWishlisted = isInWishlist(product._id);

  const handleCardClick = () => router.push(`/pages/product/${product._id}`);

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
        stock: product.stock,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      _id: product._id,
      name: product.name,
      nameAr: product.nameAr,
      mainImage: product.mainImage,
      basePrice: product.basePrice,
      finalPrice: product.finalPrice,
      stock: product.stock,
    });
  };

  const hasDiscount = product.basePrice > product.finalPrice;

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isDarkMode
          ? 'bg-white/5 border border-white/10 hover:border-white/20'
          : 'bg-white border border-black/5 hover:border-black/10'
      }`}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className={`relative aspect-square overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
        <Image
          src={product.mainImage}
          alt={isArabic ? product.nameAr : product.name}
          fill
          loading="lazy"
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <div
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
            style={{ background: accentGradient }}
          >
            -{Math.round(((product.basePrice - product.finalPrice) / product.basePrice) * 100)}%
          </div>
        )}

        {/* Action buttons */}
        <div
          className={`absolute top-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 ${
            isArabic ? 'left-2.5' : 'right-2.5'
          }`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/pages/product/${product._id}`); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              isDarkMode ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Eye size={14} />
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              isDarkMode ? 'bg-white/15 hover:bg-white/25' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Heart
              size={14}
              className={isWishlisted ? 'fill-red-500 text-red-500' : isDarkMode ? 'text-white' : 'text-gray-700'}
            />
          </button>
        </div>

        {/* Gold bottom shimmer on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
          style={{ background: accentGradient }}
        />
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <h3
          className={`text-sm font-semibold mb-2 line-clamp-2 leading-snug ${
            isDarkMode ? 'text-white/90' : 'text-gray-900'
          }`}
        >
          {isArabic ? product.nameAr : product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm sm:text-base font-black" style={{ color: accentColor }}>
            {product.finalPrice} {isArabic ? 'جنيه' : 'EGP'}
          </span>
          {hasDiscount && (
            <span className={`text-xs line-through ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
              {product.basePrice}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: accentGradient }}
        >
          <ShoppingCart size={14} />
          <span>{isArabic ? 'أضف للسلة' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
