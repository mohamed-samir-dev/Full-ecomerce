'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import {WishlistButtonProps}from '../types/navbar.types'
import { useWishlist } from '@/hooks/useWishlist';

export default function WishlistButton({ isDarkMode, size = 'md' }: WishlistButtonProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const padding = size === 'sm' ? 'p-1.5' : 'p-2';
  const { itemCount } = useWishlist();
  
  return (
    <Link 
      href="/pages/wishlist" 
      aria-label="Wishlist" 
      className={`${padding} rounded-lg transition-all relative cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <HeartIcon className={iconSize} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
