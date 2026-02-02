'use client';

import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

export default function ClothesHangerSection() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`py-20 ${isDarkMode ? 'bg-[#1F2329]' : 'bg-[#F1F1F0]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-20 ${
              isDarkMode ? 'bg-[#FF6B6B]' : 'bg-[#FF6B6B]'
            }`}></div>
            <Image 
              src="/images/ChatGPT_Image_Feb_2__2026__05_58_51_PM-removebg-preview.webp" 
              alt="clothes hanger" 
              width={384} 
              height={384} 
              className="w-full max-w-md relative z-10" 
            />
          </div>
          <div className="space-y-6">
            <h2 className={`text-4xl sm:text-5xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Premium Quality Clothing
            </h2>
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Discover our carefully curated collection of premium garments, designed for style and comfort.
            </p>
            <p className={`text-base leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Every piece is selected with attention to detail, ensuring you get the best quality and fit for your wardrobe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
