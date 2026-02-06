'use client';

import Image from 'next/image';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useRouter } from 'next/navigation';
import {FeaturedProductCardProps} from '../../types/home.types'


export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const isWishlisted = isInWishlist(product._id);

  const handleCardClick = () => {
    router.push(`/pages/product/${product._id}`);
  };

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      _id: product._id,
      name: product.name,
      nameAr: product.nameAr,
      mainImage: product.mainImage,
      basePrice: product.basePrice,
      finalPrice: product.finalPrice,
      stock: product.stock
    });
  };

  return (
    <div 
      className={`relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
        isDarkMode ? 'bg-[#1F2329]' : 'bg-white border border-gray-200'
      }`}
      onClick={handleCardClick}
    >
      <div className={`absolute top-1.5 z-10 flex gap-1 sm:gap-2 ${
        isArabic ? 'left-1.5 sm:left-2' : 'right-1.5 sm:right-2'
      }`}>
        <button onClick={(e) => {
          e.stopPropagation();
          window.location.href = `/pages/product/${product._id}`;
        }} className={`p-1 sm:p-1.5 rounded-full transition-colors ${
          isDarkMode ? 'bg-[#191C21] hover:bg-[#252930]' : 'bg-white hover:bg-gray-100'
        } shadow-md`}>
          <Eye className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <button onClick={handleWishlistToggle} className={`p-1 sm:p-1.5 rounded-full transition-colors ${
          isDarkMode ? 'bg-[#191C21] hover:bg-[#252930]' : 'bg-white hover:bg-gray-100'
        } shadow-md`}>
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
      </div>

      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.mainImage}
          alt={isArabic ? product.nameAr : product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>

      <div className="p-2 sm:p-3 md:p-4">
        <h2 className={`text-md sm:text-md font-medium mb-1 sm:mb-2 line-clamp-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {isArabic ? product.nameAr : product.name}
        </h2>
        <p className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.finalPrice} {isArabic ? 'جنيه' : 'EGP'}
        </p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#B39E7A] hover:bg-[#A08B6F] text-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">{isArabic ? 'أضف للسلة' : 'Add to Cart'}</span>
          <span className="xs:hidden">{isArabic ? 'أضف' : 'Add'}</span>
        </button>
      </div>
    </div>
  );
}
