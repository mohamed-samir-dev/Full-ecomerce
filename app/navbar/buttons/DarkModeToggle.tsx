import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import {DarkModeToggleProps}from '../types/navbar.types'


export default function DarkModeToggle({ isDarkMode, toggleDarkMode, size = 'md' }: DarkModeToggleProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  
  return (
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg transition-all cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {isDarkMode ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}
    </button>
  );
}
