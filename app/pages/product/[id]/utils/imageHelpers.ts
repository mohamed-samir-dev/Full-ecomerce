export const getImageUrl = (url: string) => {
  if (!url) return '/placeholder-image.jpg';
  if (url.startsWith('http')) return url;
  return `https://backend-for-global-shop-production-a385.up.railway.app${url.startsWith('/') ? '' : '/'}${url}`;
};
