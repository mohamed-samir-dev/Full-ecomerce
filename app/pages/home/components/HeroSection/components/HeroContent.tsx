import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { HeroContentProps } from '../../../types/home.types';
export const HeroContent = ({ slide, currentSlide, isArabic, t }: HeroContentProps) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center items-center lg:items-start text-center lg:text-left ${
      isArabic ? 'lg:pr-14' : 'lg:pl-14'
    }`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-sm uppercase tracking-wide mb-4 ${isArabic ? 'lg:text-right' : 'lg:text-left'} ${
            isDarkMode ? 'text-gray-300' : 'lg:text-[#4E504C] text-gray-200'
          }`}
        >
          {String(t(slide.descriptionKey))}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 ${isArabic ? 'lg:text-right' : 'lg:text-left'} ${
            isDarkMode ? 'text-white' : 'lg:text-[#030303] text-white'
          }`}
        >
          {String(t(slide.titleKey))}
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={slide.buttonLink}
            className="inline-block bg-[#3A6B94] text-white px-10 py-4 rounded-lg font-semibold hover:bg-[#2E5577] transition-colors"
          >
            {String(t(slide.buttonTextKey))}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
