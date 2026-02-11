export const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

export const STATUS_COLORS = {
  pending: 'from-amber-400 to-orange-500',
  confirmed: 'from-blue-400 to-blue-600',
  shipped: 'from-purple-400 to-purple-600',
  delivered: 'from-green-400 to-green-600',
  cancelled: 'from-red-400 to-red-600'
} as const;

export const STATUS_LABELS = {
  pending: { ar: 'قيد الانتظار', en: 'Pending' },
  confirmed: { ar: 'مؤكدة', en: 'Confirmed' },
  shipped: { ar: 'قيد الشحن', en: 'Shipped' },
  delivered: { ar: 'تم التوصيل', en: 'Delivered' },
  cancelled: { ar: 'ملغاة', en: 'Cancelled' }
} as const;

export const API_CONFIG = {
  ORDERS_LIMIT: 100,
  BASE_URL: process.env.NEXT_PUBLIC_API_URL
} as const;
