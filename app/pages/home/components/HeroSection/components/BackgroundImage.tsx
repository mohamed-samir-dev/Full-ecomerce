import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BackgroundImageProps } from '../../../types/home.types';



export const BackgroundImage = ({ slide, currentSlide, altText }: BackgroundImageProps) => {
  return (
    <div className="lg:hidden absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={altText}
            fill
            quality={85}
            className="object-cover"
            priority={currentSlide === 0}
            loading={currentSlide === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
