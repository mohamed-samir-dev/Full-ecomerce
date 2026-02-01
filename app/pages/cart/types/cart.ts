import { CartItem as CartItemType } from '@/store/slices/cartSlice';
// cart-ui
export interface ClearCartModalProps {
  isOpen: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
//   cart-header
export interface CartHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
  itemCount: number;
  total: number;
  subtotal: number;
}
//   cart-item
export interface CartItemProps {
  item: CartItemType;
  isDarkMode: boolean;
  isArabic: boolean;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}
// order-sammary

export interface OrderSummaryProps {
    isDarkMode: boolean;
    isArabic: boolean;
    itemCount: number;
    itemsLength: number;
    subtotal: number;
    shipping: number;
    tax: number;
    finalTotal: number;
    deliveryDateStr: string;
    user: object | null;
    onClearCart: () => void;
  }

  // order-sammary
  export interface CheckoutButtonProps {
    isDarkMode: boolean;
    isArabic: boolean;
    user: object | null;
    onClearCart: () => void;
  }
  export interface PriceBreakdownProps {
    isDarkMode: boolean;
    isArabic: boolean;
    itemCount: number;
    itemsLength: number;
    subtotal: number;
    shipping: number;
    tax: number;
    finalTotal: number;
    deliveryDateStr: string;
  }
  
  export interface PromoCodeProps {
    isDarkMode: boolean;
    isArabic: boolean;
  }
  export interface SummaryHeaderProps {
    isDarkMode: boolean;
    isArabic: boolean;
  }
  