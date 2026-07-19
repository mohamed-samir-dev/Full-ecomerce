'use client';

import { motion, AnimatePresence } from 'framer-motion';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import { useCheckoutPage } from './hooks/useCheckoutPage';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

export default function CheckoutPage() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const {
    user, items, itemCount, currentStep, setCurrentStep, isLoading,
    shippingAddress, setShippingAddress, paymentMethod, setPaymentMethod,
    notes, setNotes, governorate, setGovernorate,
    handleAddressSubmit, handleOrderSubmit,
    subtotal, shipping, tax, finalTotal, deliveryDateStr
  } = useCheckoutPage();

  const GOVERNORATES = [
    { key: 'cairo', label: t('governorate.cairo') },
    { key: 'alexandria', label: t('governorate.alexandria') },
    { key: 'giza', label: t('governorate.giza') },
    { key: 'qalyubia', label: t('governorate.qalyubia') },
    { key: 'portSaid', label: t('governorate.portSaid') },
    { key: 'suez', label: t('governorate.suez') },
    { key: 'luxor', label: t('governorate.luxor') },
    { key: 'aswan', label: t('governorate.aswan') },
    { key: 'asyut', label: t('governorate.asyut') },
    { key: 'beheira', label: t('governorate.beheira') },
    { key: 'beniSuef', label: t('governorate.beniSuef') },
    { key: 'dakahlia', label: t('governorate.dakahlia') },
    { key: 'damietta', label: t('governorate.damietta') },
    { key: 'faiyum', label: t('governorate.faiyum') },
    { key: 'gharbia', label: t('governorate.gharbia') },
    { key: 'ismailia', label: t('governorate.ismailia') },
    { key: 'kafrElSheikh', label: t('governorate.kafrElSheikh') },
    { key: 'matrouh', label: t('governorate.matrouh') },
    { key: 'minya', label: t('governorate.minya') },
    { key: 'monufia', label: t('governorate.monufia') },
    { key: 'newValley', label: t('governorate.newValley') },
    { key: 'northSinai', label: t('governorate.northSinai') },
    { key: 'qena', label: t('governorate.qena') },
    { key: 'redSea', label: t('governorate.redSea') },
    { key: 'sharqia', label: t('governorate.sharqia') },
    { key: 'sohag', label: t('governorate.sohag') },
    { key: 'southSinai', label: t('governorate.southSinai') },
  ];

  if (!user || itemCount === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="rounded-full h-12 w-12 border-4 border-t-transparent"
          style={{ borderColor: '#C9A84C', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <>
      <DynamicMetadata
        titleAr="إتمام الطلب - الدفع والشحن"
        titleEn="Checkout - Payment and Shipping"
        descriptionAr="أكمل عملية الشراء بأمان. أدخل بيانات الشحن واختر طريقة الدفع المناسبة"
        descriptionEn="Complete your purchase securely. Enter shipping information and choose your preferred payment method"
        keywordsAr={['إتمام الطلب', 'دفع', 'شحن', 'شراء']}
        keywordsEn={['checkout', 'payment', 'shipping', 'purchase']}
      />
      <div
        className={`min-h-screen py-8 sm:py-10 ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-10"
          >
            <div className={`flex items-center gap-3 mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('checkout.title')}
              </h1>
            </div>
            <p className={`text-sm mt-2 ${isArabic ? 'text-right' : ''} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('checkout.subtitle')}
            </p>
            <div className="mt-5 h-px w-full" style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }} />
          </motion.div>

          <CheckoutProgress currentStep={currentStep} isDarkMode={isDarkMode} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <ShippingForm
                    shippingAddress={shippingAddress}
                    setShippingAddress={setShippingAddress}
                    governorate={governorate}
                    setGovernorate={setGovernorate}
                    governorates={GOVERNORATES}
                    onSubmit={handleAddressSubmit}
                    isDarkMode={isDarkMode}
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
                    isDarkMode={isDarkMode}
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
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </>
  );
}
