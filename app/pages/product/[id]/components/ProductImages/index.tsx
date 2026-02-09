import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ImageModal from '../ImageModal';
import MainImage from './MainImage';
import ThumbnailGallery from './ThumbnailGallery';
import { ProductImagesProps } from '../../types/types';
import { getImageUrl } from '../../utils/imageHelpers';

export default function ProductImages({ product }: ProductImagesProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMainLoaded, setIsMainLoaded] = useState(false);
  const { isDarkMode } = useTheme();
  
  const images = product.imageGallery && product.imageGallery.length > 0 
    ? [product.mainImage, ...product.imageGallery].filter(Boolean).map(getImageUrl)
    : [product.mainImage].filter(Boolean).map(getImageUrl);

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className={`rounded-3xl overflow-hidden shadow-lg border ${isDarkMode ? 'bg-[#23272F] border-gray-700' : 'bg-white border-gray-100'}`}>
          <MainImage
            currentImage={currentImage}
            productName={product.name}
            isMainLoaded={isMainLoaded}
            onLoad={() => setIsMainLoaded(true)}
            onZoomClick={() => setIsModalOpen(true)}
          />
        </div>
        <ThumbnailGallery
          images={images}
          activeIndex={activeImageIndex}
          productName={product.name}
          onThumbnailClick={setActiveImageIndex}
        />
      </div>
      
      <ImageModal
        isOpen={isModalOpen}
        images={images}
        currentIndex={activeImageIndex}
        onClose={() => setIsModalOpen(false)}
        onNavigate={setActiveImageIndex}
      />
    </>
  );
}
