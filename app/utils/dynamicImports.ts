import dynamic from 'next/dynamic';
import React from 'react';
import type { ComponentType } from 'react';
import type { IconBaseProps } from 'react-icons';

// تحميل ديناميكي للمكونات الثقيلة
export const DynamicFooter = dynamic(() => import('@/app/footer').then(mod => ({ default: mod.Footer })), {
  loading: () => React.createElement('div', { className: 'h-64 bg-gray-100 animate-pulse' }),
  ssr: true,
});

// تحميل ديناميكي للأيقونات
export const loadIcon = (iconName: string): ComponentType<IconBaseProps> => {
  return dynamic(() => import('react-icons/fa').then((mod) => {
    const Icon = mod[iconName as keyof typeof mod] as ComponentType<IconBaseProps>;
    return { default: Icon };
  }), {
    loading: () => React.createElement('span', { className: 'inline-block w-5 h-5 bg-gray-200 animate-pulse rounded' }),
    ssr: false,
  }) as ComponentType<IconBaseProps>;
};
