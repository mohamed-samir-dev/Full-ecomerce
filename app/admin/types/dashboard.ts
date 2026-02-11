export interface Order {
  _id: string;
  userId?: { name: string };
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  products: number;
  orders: number;
  users: number;
  revenue: number;
  pendingOrders: number;
  contacts: number;
  lowStock: number;
  completedOrders: number;
  avgOrderValue: number;
}
