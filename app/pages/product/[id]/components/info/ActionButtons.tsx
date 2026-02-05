import { Heart, ShoppingCart } from 'lucide-react';
import {ActionButtonsProps}from '../../types/types'


export default function ActionButtons({ isOutOfStock, isWishlisted, onAddToCart, onToggleWishlist }: ActionButtonsProps) {
  return (
    <div className="flex gap-2 sm:gap-3">
      <button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 bg-[#B39E7A] text-white py-3 px-4 sm:py-4 sm:px-6 rounded-full text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-[#A08D6A] transition-all shadow-md hover:shadow-lg"
      >
        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <button
        onClick={onToggleWishlist}
        className={`flex items-center justify-center py-3 px-4 sm:py-4 sm:px-6 rounded-full border-2 transition-all shadow-md hover:shadow-lg ${
          isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 text-gray-400 hover:border-red-300 hover:bg-red-50'
        }`}
      >
        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}
