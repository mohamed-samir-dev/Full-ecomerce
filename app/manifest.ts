import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Global Shop - متجر عالمي للتسوق الإلكتروني',
    short_name: 'Global Shop',
    description: 'متجر إلكتروني شامل يوفر أفضل المنتجات من ملابس، أحذية، إكسسوارات، إلكترونيات ومستلزمات الحيوانات الأليفة',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
