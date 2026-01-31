import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HeroContentProps } from '../../../types/home.types';
export const HeroContent = ({ slide, currentSlide, isDarkMode, isArabic, t }: HeroContentProps) => {
  return (
    <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center items-center lg:items-start text-center lg:text-left ${
      isArabic ? 'lg:pr-14' : 'lg:pl-14'
    }`}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            isDarkMode ? 'text-white' : 'lg:text-[#030303] text-white'
          } ${isArabic ? 'lg:text-right' : 'lg:text-left'}`}
        >
          {String(t(slide.titleKey))}
        </motion.h2>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-base sm:text-lg mb-6 sm:mb-8 px-4 lg:px-0 ${
            isDarkMode ? 'text-gray-300' : 'lg:text-[#4E504C] text-gray-100'
          } ${isArabic ? 'lg:text-right' : 'lg:text-left'}`}
        >
          {String(t(slide.descriptionKey))}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={isArabic ? 'lg:text-right' : 'lg:text-left'}
        >
          <Link
            href={slide.buttonLink}
            className="inline-block bg-[#3A6B94] text-white px-8 sm:px-12 py-3 rounded-full transition-colors font-semibold hover:bg-[#2E5577] text-sm sm:text-base"
          >
            {String(t(slide.buttonTextKey))}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
