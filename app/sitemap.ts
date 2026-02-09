import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://full-ecomerce-gamma.vercel.app';
  
  const routes = [
    '',
    '/pages/shop',
    '/pages/about',
    '/pages/contact',
    '/pages/login',
    '/pages/register',
    '/pages/cart',
    '/pages/checkout',
    '/pages/wishlist',
    '/pages/profile',
    '/pages/orders',
    '/pages/order-confirmation',
    '/pages/men',
    '/pages/men/collection',
    '/pages/women',
    '/pages/women/collection',
    '/pages/kids',
    '/pages/kids/collection',
    '/pages/shoes',
    '/pages/shoes/collection',
    '/pages/accessories',
    '/pages/accessories/collection',
    '/pages/electronic',
    '/pages/electronic/collection',
    '/pages/PetSupplies',
    '/pages/PetSupplies/collection',
    '/pages/banner-pages/deals',
    '/pages/banner-pages/premium',
    '/pages/banner-pages/products',
    '/pages/banner-pages/sale',
    '/pages/banner-pages/trending',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
