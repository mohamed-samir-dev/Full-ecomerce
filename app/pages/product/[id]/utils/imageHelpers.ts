export const getImageUrl = (url: string) => {
  if (!url) return '/placeholder-image.jpg';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
};
