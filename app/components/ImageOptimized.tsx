'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL' | 'alt'> {
  priority?: boolean;
  alt: string;
}

const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

export default function ImageOptimized({ priority = false, quality = 75, alt, ...props }: OptimizedImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
    />
  );
}
