"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { Product } from "../types";
import { ShoppingCart, Eye, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const isWishlisted = isInWishlist(product._id);
  const hasDiscount = product.discount && product.discount.value > 0;
  const discountPercentage = hasDiscount && product.discount?.type === 'percentage'
    ? product.discount.value
    : hasDiscount && product.discount?.type === 'fixed'
    ? Math.round((product.discount.value / product.basePrice) * 100)
    : 0;

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

  const handleCardClick = () => {
    router.push(`/pages/product/${product._id}`);
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
      category: product.category,
      brand: product.brand
    });
  };

  return (
    <div 
      className={`rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border cursor-pointer group ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-amber-700 hover:shadow-amber-900/30' 
          : 'bg-white border-transparent hover:border-amber-100 hover:shadow-amber-100/50'
      }`}
      onClick={handleCardClick}
    >
        {/* Product Image */}
        <div className={`aspect-3/4 relative overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <Image
            src={product.mainImage}
            alt={isArabic ? product.nameAr : product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && (
            <div className={`absolute top-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
              isArabic ? 'left-4' : 'right-4'
            }`}>
              -{discountPercentage}%
            </div>
          )}
          {/* Heart Icon */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all ${
              isArabic ? 'right-4' : 'left-4'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className={`font-light mb-2 line-clamp-2 text-lg group-hover:text-[#8B6914] transition-colors ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {isArabic ? product.nameAr : product.name}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(product.averageRating) ? 'text-amber-400' : (isDarkMode ? 'text-gray-600' : 'text-gray-200')}`}>
                ★
              </span>
            ))}
            <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>({product.totalReviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-[#8B6914]">{product.finalPrice}</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{isArabic ? 'جنيه' : 'EGP'}</span>
              {hasDiscount && (
                <span className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{product.basePrice}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { 
                  e.preventDefault(); 
                  router.push(`/pages/product/${product._id}`); 
                }} 
                className="w-10 h-10 bg-[#8B6914] rounded-full flex items-center justify-center hover:bg-[#6B5010] transition-all shadow-sm"
                aria-label="View product details"
              >
                <Eye className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0 || product.availability === 'out_of_stock'}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  product.stock === 0 || product.availability === 'out_of_stock'
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#8B6914] text-white hover:bg-[#6B5010]"
                }`}
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
