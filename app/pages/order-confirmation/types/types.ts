export interface OrderItem {
  productId: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderData {
  _id: string;
  products: OrderItem[];
  totalPrice: number;
  status: string;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

export interface DeliveryInfoProps {
  estimatedDelivery: string;
  isDarkMode: boolean;
}
export interface OrderHeaderProps {
  orderId: string;
  createdAt: string;
  isPrivateView: boolean;
  isDarkMode: boolean;
  onTogglePrivacy: () => void;
}

export interface OrderItemsProps {
  products: OrderItem[];
  isPrivateView: boolean;
  isDarkMode: boolean;
}
export interface OrderStatusTimelineProps {
  createdAt: string;
  estimatedDelivery: string;
  isDarkMode: boolean;
}
export interface OrderSummaryProps {
  totalPrice: number;
  isPrivateView: boolean;
  isDarkMode: boolean;
}
export interface PaymentInfoProps {
  paymentMethod: string;
  orderId: string;
  isPrivateView: boolean;
  isDarkMode: boolean;
}

export interface ShippingInfoProps {
  shippingAddress: OrderData['shippingAddress'];
  isPrivateView: boolean;
  isDarkMode: boolean;
}
