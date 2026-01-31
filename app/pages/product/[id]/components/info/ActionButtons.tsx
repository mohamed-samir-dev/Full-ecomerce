import { Heart, ShoppingCart } from 'lucide-react';
import {ActionButtonsProps}from '../../types/types'


export default function ActionButtons({ isOutOfStock, isWishlisted, onAddToCart, onToggleWishlist }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
      <button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 bg-[#B39E7A] text-white py-3 sm:py-4 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-[#A08B6F]"
      >
        <ShoppingCart className="w-5 h-5" />
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <button
        onClick={onToggleWishlist}
        className={`flex items-center justify-center py-3 sm:py-4 px-6 sm:px-8 rounded-lg border-2 transition-colors ${
          isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 text-gray-400 hover:border-red-300'
        }`}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}
