import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import {MainImageProps}from '../../types/types'

export default function MainImage({ currentImage, productName, isMainLoaded, onLoad, onZoomClick }: MainImageProps) {
  return (
    <div className="relative w-full h-[400px] sm:h-[600px] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
      <button
        onClick={onZoomClick}
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-opacity"
        aria-label="Zoom in image"
      >
        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 cursor-pointer" />
      </button>
      <Image
        src={currentImage || '/placeholder-image.jpg'}
        alt={`${productName} main image`}
        fill
        loading="lazy"
        onLoad={onLoad}
        className={`object-cover hover:scale-105 transition-all duration-500 ${
          isMainLoaded ? 'blur-0' : 'blur-sm scale-105'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
      />
    </div>
  );
}
