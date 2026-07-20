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
import { OrderData } from './types/types';

function printOrder(orderData: OrderData) {
  const subtotal = orderData.products.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 15000 ? 0 : 15;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const win = window.open('', '_blank', 'width=800,height=900');
  if (!win) return;

  win.document.write(`
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>تأكيد الطلب - ${orderData._id.slice(-8)}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #fff; color: #111; padding: 32px; }
        .header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .badge { background: linear-gradient(135deg,#8B6914,#C9A84C); color: #fff; border-radius: 10px; padding: 8px 12px; font-size: 13px; font-weight: bold; }
        h1 { font-size: 22px; font-weight: bold; }
        .sub { color: #666; font-size: 13px; margin-bottom: 4px; }
        .divider { height: 1px; background: linear-gradient(to right,#C9A84C60,transparent); margin: 16px 0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; break-inside: avoid; }
        .card-title { font-size: 14px; font-weight: bold; margin-bottom: 10px; color: #111; display: flex; align-items: center; gap: 8px; }
        .card-title span { background: linear-gradient(135deg,#8B6914,#C9A84C); color:#fff; border-radius:6px; padding:3px 8px; font-size:11px; }
        .row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #444; }
        .row.total { font-weight: bold; font-size: 15px; color: #111; border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 4px; }
        .gold { color: #C9A84C; font-weight: bold; }
        .item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
        .item:last-child { border-bottom: none; }
        .item img { width: 52px; height: 52px; object-fit: cover; border-radius: 8px; border: 1px solid #eee; }
        .item-info { flex: 1; }
        .item-name { font-size: 13px; font-weight: 600; margin-bottom: 3px; }
        .item-meta { font-size: 12px; color: #666; }
        .item-price { font-size: 13px; font-weight: bold; color: #C9A84C; text-align: left; }
        .full { grid-column: 1 / -1; }
        .status-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg,#8B6914,#C9A84C); flex-shrink: 0; }
        .dot.grey { background: #d1d5db; }
        @media print { body { padding: 16px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="badge">✓ تم تأكيد الطلب</div>
        <div>
          <h1>تأكيد الطلب</h1>
          <p class="sub">رقم الطلب: ${orderData._id.slice(-8)}</p>
        </div>
      </div>
      <p class="sub">تاريخ الطلب: ${new Date(orderData.createdAt).toLocaleString('ar-EG')}</p>
      <div class="divider"></div>

      <div class="grid">
        <!-- Order Status -->
        <div class="card full">
          <div class="card-title"><span>📦</span> حالة الطلب</div>
          <div class="status-row"><div class="dot"></div><div><strong>تم تأكيد الطلب</strong><br/><span style="color:#666;font-size:12px">${new Date(orderData.createdAt).toLocaleString('ar-EG')}</span></div></div>
          <div class="status-row"><div class="dot grey"></div><div><strong>قيد المعالجة</strong><br/><span style="color:#666;font-size:12px">1-2 أيام عمل</span></div></div>
          <div class="status-row"><div class="dot grey"></div><div><strong>تم الشحن</strong><br/><span style="color:#666;font-size:12px">التوصيل المتوقع: ${new Date(orderData.estimatedDelivery).toLocaleDateString('ar-EG')}</span></div></div>
        </div>

        <!-- Items -->
        <div class="card full">
          <div class="card-title"><span>🛍</span> المنتجات (${orderData.products.length})</div>
          ${orderData.products.map(item => `
            <div class="item">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'" />` : ''}
              <div class="item-info">
                <div class="item-name">${item.nameAr || item.name}</div>
                <div class="item-meta">الكمية: ${item.quantity} &nbsp;|&nbsp; سعر الوحدة: $${item.price.toFixed(2)}</div>
              </div>
              <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          `).join('')}
        </div>

        <!-- Shipping -->
        <div class="card">
          <div class="card-title"><span>📍</span> عنوان الشحن</div>
          <p style="font-size:13px;line-height:1.8;color:#444">
            <strong>${orderData.shippingAddress.fullName}</strong><br/>
            ${orderData.shippingAddress.address}<br/>
            ${orderData.shippingAddress.city}, ${orderData.shippingAddress.postalCode}<br/>
            ${orderData.shippingAddress.country}<br/>
            <span class="gold">${orderData.shippingAddress.phone}</span>
          </p>
        </div>

        <!-- Payment -->
        <div class="card">
          <div class="card-title"><span>💳</span> طريقة الدفع</div>
          <p style="font-size:13px;line-height:1.8;color:#444">
            <strong>${orderData.paymentMethod}</strong><br/>
            رقم المعاملة: ${orderData._id.slice(0, 16)}<br/>
            حالة الدفع: <span class="gold">مكتمل</span>
          </p>
        </div>

        <!-- Summary -->
        <div class="card full">
          <div class="card-title"><span>🧾</span> ملخص الطلب</div>
          <div class="row"><span>المجموع الفرعي</span><span>$${subtotal.toFixed(2)}</span></div>
          <div class="row"><span>الشحن</span><span class="${shipping === 0 ? 'gold' : ''}">${shipping === 0 ? 'مجاني' : '$' + shipping.toFixed(2)}</span></div>
          <div class="row"><span>الضريبة (5%)</span><span>$${tax.toFixed(2)}</span></div>
          <div class="row total"><span>الإجمالي</span><span class="gold">$${total.toFixed(2)}</span></div>
        </div>
      </div>
    </body>
    </html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 500);
}

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
      <div className={`min-h-screen py-8 sm:py-10 ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <OrderActions isDarkMode={isDarkMode} onPrint={() => printOrder(orderData)} />
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