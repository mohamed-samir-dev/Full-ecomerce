// Resource Hints للتحسين
export const resourceHints = {
  preconnect: [
    'https://backend-for-global-shop-production-a385.up.railway.app',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://i.ibb.co',
  ],
  dnsPrefetch: [
    'https://images.unsplash.com',
  ],
};

// تحسينات الصور
export const imageOptimization = {
  quality: {
    hero: 75,
    product: 80,
    thumbnail: 70,
    background: 65,
  },
  sizes: {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  },
};

// تحسينات الأداء
export const performanceConfig = {
  // تأخير تحميل المكونات غير المهمة
  lazyLoadDelay: 100,
  
  // حد أقصى للصور المحملة مسبقاً
  maxPriorityImages: 2,
  
  // تفعيل الكاش
  enableCache: true,
  
  // مدة الكاش (بالثواني)
  cacheDuration: 31536000, // سنة واحدة
};
