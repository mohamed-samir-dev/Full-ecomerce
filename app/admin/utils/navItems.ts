export const getNavItems = (isArabic: boolean) => [
  { href: '/admin', icon: '📊', label: isArabic ? 'لوحة التحكم' : 'Dashboard' },
  { href: '/admin/page/add-product', icon: '📦', label: isArabic ? 'إضافة منتج' : 'Add Product' },
  { href: '/admin/page/products', icon: '🛍️', label: isArabic ? 'المنتجات' : 'Products' },
  { href: '/admin/page/orders', icon: '📋', label: isArabic ? 'الطلبات' : 'Orders' },
  { href: '/admin/page/users', icon: '👥', label: isArabic ? 'المستخدمين' : 'Users' },
  { href: '/admin/page/categories', icon: '📂', label: isArabic ? 'الفئات' : 'Categories' },
  { href: '/admin/page/brands', icon: '🏷️', label: isArabic ? 'العلامات التجارية' : 'Brands' },
  { href: '/admin/promo-codes', icon: '🎟️', label: isArabic ? 'أكواد الخصم' : 'Promo Codes' },
  { href: '/admin/page/contacts', icon: '✉️', label: isArabic ? 'الرسائل' : 'Contacts' },
  { href: '/admin/page/customer-says', icon: '💬', label: isArabic ? 'آراء العملاء' : 'Customer Says' },
  { href: '/admin/page/reviews', icon: '⭐', label: isArabic ? 'التقييمات' : 'Reviews' }
];
