import { DollarSign, ShoppingCart, Package, Users, Clock, CheckCircle, AlertTriangle, Mail, Plus, Eye, Settings, Tag } from 'lucide-react';

interface Stats {
  revenue: number;
  orders: number;
  products: number;
  users: number;
  pendingOrders: number;
  completedOrders: number;
  lowStock: number;
  contacts: number;
}

export const getMainStats = (stats: Stats, isArabic: boolean) => [
  { title: isArabic ? 'إجمالي الإيرادات' : 'Total Revenue', value: stats.revenue, prefix: isArabic ? 'جنيه' : 'EGP', icon: DollarSign, color: 'from-emerald-500 to-teal-600', trend: '+12.5%', up: true },
  { title: isArabic ? 'إجمالي الطلبات' : 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'from-blue-500 to-indigo-600', trend: '+8.2%', up: true },
  { title: isArabic ? 'المنتجات' : 'Products', value: stats.products, icon: Package, color: 'from-violet-500 to-purple-600', trend: '+3.1%', up: true },
  { title: isArabic ? 'العملاء' : 'Customers', value: stats.users, icon: Users, color: 'from-orange-500 to-red-600', trend: '+15.3%', up: true }
];

export const getQuickStats = (stats: Stats, isArabic: boolean) => [
  { label: isArabic ? 'قيد الانتظار' : 'Pending', value: stats.pendingOrders, icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: isArabic ? 'مكتملة' : 'Completed', value: stats.completedOrders, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  { label: isArabic ? 'مخزون منخفض' : 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  { label: isArabic ? 'الرسائل' : 'Messages', value: stats.contacts, icon: Mail, color: 'text-blue-600 bg-blue-50' }
];

export const getQuickActions = (isArabic: boolean) => [
  { label: isArabic ? 'إضافة منتج' : 'Add Product', href: '/admin/page/add-product', icon: Plus, color: 'from-blue-500 to-blue-600' },
  { label: isArabic ? 'عرض الطلبات' : 'View Orders', href: '/admin/page/orders', icon: Eye, color: 'from-green-500 to-green-600' },
  { label: isArabic ? 'إدارة المستخدمين' : 'Manage Users', href: '/admin/page/users', icon: Settings, color: 'from-purple-500 to-purple-600' },
  { label: isArabic ? 'أكواد الخصم' : 'Promo Codes', href: '/admin/page/promo-codes', icon: Tag, color: 'from-orange-500 to-orange-600' }
];
