import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HeroImageProps } from '../../../types/home.types';


export const HeroImage = ({ slide, currentSlide, altText }: HeroImageProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 justify-center lg:justify-end">
      <div className="relative w-150 h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={altText}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
