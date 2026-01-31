'use client';

import { useTheme } from '@/context/ThemeContext';
import { categories } from '../../data/homeData';

export default function CategorySection() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`py-16 sm:py-20 ${isDarkMode ? 'bg-[#191C21]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-bold  mb-10 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-[#1F2329] hover:bg-[#252930] shadow-lg shadow-black/20' 
                  : 'bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <span className={`text-sm sm:text-base font-medium text-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {category.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
