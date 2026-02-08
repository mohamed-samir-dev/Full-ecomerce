export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  orders?: Order[];
  wishlist?: WishlistItem[];
  addresses?: Address[];
  cart?: CartItem[];
}

export interface ProfileInfoProps {
  user: User;
  setUser: (user: User) => void;
  isDarkMode: boolean;
}

export interface EditData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface PasswordStrength {
  score: number;
  message: string;
}

export interface Address {
  _id: string;
  label: string;
  street: string;
  governorate: string;
  postalCode: string;
}

export interface AddressFormData {
  label: string;
  street: string;
  governorate: string;
  postalCode: string;
}

export interface AddressesSectionProps {
  user: User;
  setUser: (user: User) => void;
  isDarkMode: boolean;
}

export interface OrderProduct {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  products: OrderProduct[];
  status: string;
  totalPrice: number;
  createdAt: string;
  shippingAddress: Address;
}

export interface OrdersHistoryProps {
  isDarkMode: boolean;
}

export interface ProfileHeaderProps {
  user: User;
  isDarkMode: boolean;
}


interface WishlistItem {
  _id: string;
}

interface CartItem {
  _id: string;
}


export interface ProfileStatsProps {
  user: User;
  isDarkMode: boolean;
}