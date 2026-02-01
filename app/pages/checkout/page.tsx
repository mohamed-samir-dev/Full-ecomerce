'use client';

import { motion, AnimatePresence } from 'framer-motion';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import { useCheckoutPage } from './hooks/useCheckoutPage';

const EGYPT_GOVERNORATES = [
  'Cairo', 'Alexandria', 'Giza', 'Qalyubia', 'Port Said', 'Suez',
  'Luxor', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Dakahlia',
  'Damietta', 'Faiyum', 'Gharbia', 'Ismailia', 'Kafr El Sheikh',
  'Matrouh', 'Minya', 'Monufia', 'New Valley', 'North Sinai',
  'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai'
];

export default function CheckoutPage() {
  const {
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
  } = useCheckoutPage();

  if (!user || itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }



  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12 bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Complete your order</p>
        </motion.div>
        
        <CheckoutProgress currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-10 md:mt-16">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <ShippingForm
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  governorate={governorate}
                  setGovernorate={setGovernorate}
                  governorates={EGYPT_GOVERNORATES}
                  onSubmit={handleAddressSubmit}
                />
              )}

              {currentStep === 2 && (
                <PaymentForm
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  notes={notes}
                  setNotes={setNotes}
                  isLoading={isLoading}
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleOrderSubmit}
                />
              )}
            </AnimatePresence>
          </div>

          <OrderSummary 
            items={items}
            itemCount={itemCount}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            finalTotal={finalTotal}
            deliveryDateStr={deliveryDateStr}
          />
        </div>
      </div>
    </div>
  );
}
