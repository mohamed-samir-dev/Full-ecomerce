import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import OrderService from '@/services/orderService';
import type { CreateOrderData } from '@/services/orderService';

export const useCheckoutPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { items, total, itemCount, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  const [governorate, setGovernorate] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/pages/login?redirect=checkout');
      return;
    }
    
    if (itemCount === 0) {
      toast.error('Your cart is empty');
      router.push('/pages/cart');
    }
  }, [user, itemCount, router]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => 
      !shippingAddress[field as keyof typeof shippingAddress]
    );
    
    if (missingFields.length > 0) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setCurrentStep(2);
  };

  const handleOrderSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please login to place an order');
        router.push('/pages/login?redirect=checkout');
        return;
      }

      // Validate required data before creating order
      if (!items || items.length === 0) {
        toast.error('Your cart is empty');
        router.push('/pages/cart');
        return;
      }

      if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city) {
        toast.error('Please complete your shipping address');
        setCurrentStep(1);
        return;
      }

      const orderData: CreateOrderData = {
        products: items.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.finalPrice || item.product.basePrice,
          quantity: item.quantity,
          selectedOptions: {}
        })),
        shippingAddress,
        paymentMethod,
        notes,
        totalPrice: finalTotal,
        status: 'confirmed'
      };

      const result = await OrderService.createOrder(orderData);
      const orderId = result.data?._id || OrderService.generateSecureOrderId();
      
      await clearCart();
      toast.success('Order placed successfully!');
      
      router.push(`/pages/order-confirmation?orderId=${orderId}`);
    } catch (error: unknown) {
      console.error('Order creation error:', error);
      if (error instanceof Error) {
        if (error.message === 'Not authorized') {
          toast.error('Please login to place an order');
          router.push('/pages/login?redirect=checkout');
        } else if (error.message.includes('required')) {
          toast.error(error.message);
        } else {
          toast.error('Failed to place order. Please try again.');
        }
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = total || 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (shipping === 0 ? 2 : 5));
  const deliveryDateStr = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return {
    user,
    items,
    itemCount,
    currentStep,
    setCurrentStep,
    isLoading,
    shippingAddress,
    setShippingAddress,
    paymentMethod,
    setPaymentMethod,
    notes,
    setNotes,
    governorate,
    setGovernorate,
    handleAddressSubmit,
    handleOrderSubmit,
    subtotal,
    shipping,
    tax,
    finalTotal,
    deliveryDateStr
  };
};
