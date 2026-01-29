import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import {CartButtonProps}from '../types/navbar.types'


export default function CartButton({ cartCount, isDarkMode, isArabic, size = 'md' }: CartButtonProps) {
  const iconSize = size === 'xs' ? 'h-4 w-4' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const padding = size === 'xs' ? 'p-1.5' : size === 'sm' ? 'p-2' : 'p-2';
  const badgeSize = size === 'xs' ? 'h-3.5 w-3.5 text-[10px] -top-0.5' : size === 'sm' ? 'h-4 w-4 text-[10px] -top-1' : 'h-5 w-5 text-xs -top-1';
  
  return (
    <Link 
      href="/cart" 
      aria-label="Shopping Cart" 
      className={`${padding} rounded-lg transition-all relative cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <ShoppingCartIcon className={iconSize} />
      {cartCount > 0 && (
        <span className={`absolute ${badgeSize} ${isArabic ? '-left-0.5' : '-right-0.5'} bg-red-500 text-white rounded-full flex items-center justify-center font-medium`}>
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
}
