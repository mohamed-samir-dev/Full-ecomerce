interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: {
    size?: string;
    color?: string;
  };
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface CreateOrderData {
  products: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes?: string;
  totalPrice: number;
  status?: string;
}

interface OrderResponse {
  success: boolean;
  data?: {
    _id?: string;
    status?: string;
    [key: string]: unknown;
  };
  message?: string;
}

class OrderService {
  private static instance: OrderService;
  private baseUrl = '/api/orders';

  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || sessionStorage.getItem('token')) : null;
    if (!token) {
      throw new Error('Not authorized');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async createOrder(orderData: CreateOrderData): Promise<OrderResponse> {
    try {
      // Validate required fields before sending
      if (!orderData.products || orderData.products.length === 0) {
        throw new Error('Products are required');
      }
      
      if (!orderData.shippingAddress || !orderData.shippingAddress.fullName) {
        throw new Error('Shipping address is required');
      }
      
      if (!orderData.paymentMethod) {
        throw new Error('Payment method is required');
      }
      
      if (!orderData.totalPrice || orderData.totalPrice <= 0) {
        throw new Error('Valid total price is required');
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          ...orderData,
          isPrivate: true,
          securityLevel: 'high',
          encryptionEnabled: true
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Log successful order creation (without sensitive data)
      console.log('Order created successfully:', {
        orderId: data.data?._id,
        status: data.data?.status,
        timestamp: new Date().toISOString()
      });

      return data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  }

  async getOrder(orderId: string): Promise<OrderResponse> {
    try {
      const response = await fetch(`${this.baseUrl}?orderId=${orderId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch order');
      }

      return data;
    } catch (error) {
      console.error('Order fetch error:', error);
      throw error;
    }
  }

  async getUserOrders(): Promise<OrderResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      return data;
    } catch (error) {
      console.error('Orders fetch error:', error);
      throw error;
    }
  }

  // Utility method to mask sensitive data for display
  maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (!data || data.length <= visibleChars) {
      return '••••••••';
    }
    
    const masked = '•'.repeat(data.length - visibleChars);
    return masked + data.slice(-visibleChars);
  }

  // Generate secure order ID
  generateSecureOrderId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }
}

export default OrderService.getInstance();
export type { OrderItem, ShippingAddress, CreateOrderData, OrderResponse };