export interface OrderItem {
  productId: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  selectedOptions?: {
    size?: string;
    color?: string;
  };
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  _id: string;
  products: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  notes?: string;
}
export interface EmptyStateProps {
  statusFilter: string;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface OrderCardProps {
  order: Order;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface OrderDetailsProps {
  order: Order;
  subtotal: number;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface OrderHeaderProps {
  orderId: string;
  statusConfig: { color: string; icon: React.ReactElement; labelKey: string };
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface OrdersListProps {
  orders: Order[];
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface OrderSummaryGridProps {
  createdAt: string;
  itemCount: number;
  productCount: number;
  totalPrice: number;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface PaymentInfoProps {
  paymentMethod: string;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface PriceSummaryProps {
  subtotal: number;
  totalPrice: number;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface ProductItemProps {
  item: {
    name: string;
    nameAr?: string;
    quantity: number;
    price: number;
    selectedOptions?: { size?: string; color?: string };
  };
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface ProductListProps {
  products: Array<{
    name: string;
    nameAr?: string;
    quantity: number;
    price: number;
    selectedOptions?: { size?: string; color?: string };
  }>;
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface ShippingInfoProps {
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  isDarkMode: boolean;
  isArabic: boolean;
}
export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorScheme: 'default' | 'orange' | 'blue' | 'emerald';
  isDarkMode: boolean;
}
export interface StatsGridProps {
  stats: {
    total: number;
    processing: number;
    shipped: number;
    delivered: number;
  };
  isDarkMode: boolean;
  isArabic: boolean;
}

export interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
  isArabic: boolean;
}