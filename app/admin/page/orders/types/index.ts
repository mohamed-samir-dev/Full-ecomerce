export interface Order {
  _id: string;
  userId: { _id: string; name: string; email: string };
  products: Array<{
    productId: { _id: string; name: string; mainImage?: string };
    name: string;
    quantity: number;
    price: number;
    selectedOptions?: { size?: string; color?: string };
  }>;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenue: number;
}
