"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "../types";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import StarRating from "../../../components/StarRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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
      className="border rounded-lg p-3 md:p-4 w-full relative transition-all duration-200 hover:shadow-lg flex flex-col h-full bg-white border-gray-200 hover:border-gray-300 cursor-pointer"
      onClick={handleCardClick}
    >
        {/* Heart Icon */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1.5 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={Math.round(product.averageRating)} readonly size="sm" />
            <span className="text-sm text-gray-700">{product.averageRating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({product.totalReviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg md:text-xl font-bold text-gray-900">{product.finalPrice} EGP</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {product.basePrice} EGP
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || product.availability === 'out_of_stock'}
              className={`flex-1 cursor-pointer py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                product.stock === 0 || product.availability === 'out_of_stock'
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#B39E7A] text-white hover:bg-[#A08B6F]"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock === 0 || product.availability === 'out_of_stock' ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/pages/product/${product._id}`);
              }}
              className="py-2 cursor-pointer px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
    </div>
  );
}
