import { motion } from 'framer-motion';
import {NavigationIndicatorProps}from '../../../types/home.types'


export const NavigationIndicator = ({ totalSlides, currentSlide, onSlideChange }: NavigationIndicatorProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSlideChange(index)}
          aria-label={`Go to slide ${index + 1}`}
          className="p-3 min-w-[40px] min-h-[48px] flex items-center justify-center"
        >
          <motion.span
            className={`h-1 rounded-full block ${
              index === currentSlide 
                ? 'bg-[#447EAE]' 
                : 'bg-white/60'
            }`}
            animate={{
              width: index === currentSlide ? 32 : 8,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      ))}
    </div>
  );
};
