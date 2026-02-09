'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

interface WindowWithGtag extends Window {
  gtag?: (...args: unknown[]) => void;
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag?.('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return null;
}

// Performance optimization utilities
export const prefetchRoute = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

export const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Lazy load images observer
export const useLazyLoad = () => {
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });

      return () => imageObserver.disconnect();
    }
  }, []);
};
