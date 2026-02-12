import Image from 'next/image';
import { BackgroundImageProps } from '../../../types/home.types';

export const BackgroundImage = ({ slide, currentSlide, altText }: BackgroundImageProps) => {
  return (
    <div className="lg:hidden absolute inset-0">
      <Image
        src={slide.image}
        alt={altText}
        fill
        quality={70}
        sizes="100vw"
        className="object-cover"
        priority={currentSlide === 0}
        loading={currentSlide === 0 ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};
