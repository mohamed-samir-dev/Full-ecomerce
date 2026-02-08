import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HeroImageProps } from '../../../types/home.types';


export const HeroImage = ({ slide, currentSlide, altText }: HeroImageProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 justify-center lg:justify-end">
      <div className="relative w-150 h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full rounded-2xl overflow-hidden"
          >
            <Image
              src={slide.image}
              alt={altText}
              fill
              quality={70}
              sizes="(min-width: 1024px) 50vw, 0px"
              className="object-cover"
              priority={currentSlide === 0}
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
