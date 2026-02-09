import Image from 'next/image';
import {ThumbnailGalleryProps}from '../../types/types'


export default function ThumbnailGallery({ images, activeIndex, productName, onThumbnailClick }: ThumbnailGalleryProps) {
  if (images.length <= 1) return null;

  return (
    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onThumbnailClick(index)}
          className={`shrink-0 w-30 h-30 sm:w-16 sm:h-24 md:w-30 md:h-30 rounded-lg overflow-hidden border-2 transition-all ${
            activeIndex === index ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
          }`}
          aria-label={`View image ${index + 1} of ${images.length}`}
        >
          <Image 
            src={image || '/placeholder-image.jpg'} 
            alt={`${productName} view ${index + 1}`}
            width={80}
            height={80}
            loading="lazy"
            className="w-full h-full object-cover" 
          />
        </button>
      ))}
    </div>
  );
}
