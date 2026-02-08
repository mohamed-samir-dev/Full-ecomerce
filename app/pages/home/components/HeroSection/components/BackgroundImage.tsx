import Image from 'next/image';
import { BackgroundImageProps } from '../../../types/home.types';

export const BackgroundImage = ({ slide, currentSlide, altText }: BackgroundImageProps) => {
  return (
    <div className="lg:hidden absolute inset-0">
      <Image
        src={slide.image}
        alt={altText}
        fill
        quality={75}
        sizes="100vw"
        className="object-cover"
        priority={currentSlide === 0}
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};
