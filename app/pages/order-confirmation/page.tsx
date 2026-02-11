'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import { useOrderData } from './hooks/useOrderData';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import OrderHeader from './components/OrderHeader';
import OrderStatusTimeline from './components/OrderStatusTimeline';
import OrderItems from './components/OrderItems';
import ShippingInfo from './components/ShippingInfo';
import PaymentInfo from './components/PaymentInfo';
import OrderSummary from './components/OrderSummary';
import DeliveryInfo from './components/DeliveryInfo';
import OrderActions from './components/OrderActions';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();
  const [isPrivateView, setIsPrivateView] = useState(true);
  const orderId = searchParams.get('orderId');
  const { orderData, isLoading } = useOrderData(orderId);

  if (isLoading) {
    return <LoadingState isDarkMode={isDarkMode} />;
  }

  if (!orderData) {
    return <ErrorState isDarkMode={isDarkMode} />;
  }

  return (
    <>
      <DynamicMetadata
        titleAr="تأكيد الطلب - شكراً لطلبك"
        titleEn="Order Confirmation - Thank You For Your Order"
        descriptionAr="تم استلام طلبك بنجاح. تفاصيل الطلب ومعلومات الشحن والتوصيل"
        descriptionEn="Your order has been received successfully. Order details, shipping and delivery information"
        keywordsAr={['تأكيد الطلب', 'طلب ناجح', 'شكراً']}
        keywordsEn={['order confirmation', 'successful order', 'thank you']}
      />
      <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrderHeader 
          orderId={orderData._id}
          createdAt={orderData.createdAt}
          isPrivateView={isPrivateView}
          isDarkMode={isDarkMode}
          onTogglePrivacy={() => setIsPrivateView(!isPrivateView)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderStatusTimeline 
              createdAt={orderData.createdAt}
              estimatedDelivery={orderData.estimatedDelivery}
              isDarkMode={isDarkMode}
            />

            <OrderItems 
              products={orderData.products}
              isPrivateView={isPrivateView}
              isDarkMode={isDarkMode}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ShippingInfo 
                shippingAddress={orderData.shippingAddress}
                isPrivateView={isPrivateView}
                isDarkMode={isDarkMode}
              />
              
              <PaymentInfo 
                paymentMethod={orderData.paymentMethod}
                orderId={orderData._id}
                isPrivateView={isPrivateView}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          <div className="space-y-6">
            <OrderSummary 
              totalPrice={orderData.totalPrice}
              products={orderData.products}
              isPrivateView={isPrivateView}
              isDarkMode={isDarkMode}
            />

            <DeliveryInfo 
              estimatedDelivery={orderData.estimatedDelivery}
              isDarkMode={isDarkMode}
            />

            <OrderActions isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default function OrderConfirmationPage() {
  const { isDarkMode } = useTheme();
  
  return (
    <Suspense fallback={<LoadingState isDarkMode={isDarkMode} />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}