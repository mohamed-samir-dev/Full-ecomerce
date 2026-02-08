'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface HeroBannerProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  buttonHoverColor: string;
  titleColor?: string;
}

function HeroBanner({ image, title, description, buttonText, buttonLink, buttonColor, buttonHoverColor, titleColor = 'white' }: HeroBannerProps) {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full max-w-[1400px] mx-auto rounded-lg sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
      <Image src={image} alt={title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1400px" quality={75} placeholder="blur" blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ddd' filter='url(%23b)'/%3E%3C/svg%3E" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent flex items-center px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="text-white max-w-xs sm:max-w-md lg:max-w-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight" style={{ color: titleColor }}>{title}</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 leading-relaxed">{description}</p>
          <Link href={buttonLink} className="inline-block text-white px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg transition-all shadow-lg" style={{ backgroundColor: buttonColor }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonColor}>{buttonText}</Link>
        </div>
      </div>
    </div>
  );
}

export default memo(HeroBanner);
