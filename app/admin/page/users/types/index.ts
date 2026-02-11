export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  orders: string[];
  wishlist: string[];
  cart: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

export interface UserStats {
  total: number;
  admins: number;
  users: number;
  withOrders: number;
}
