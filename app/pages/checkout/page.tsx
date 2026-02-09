'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#252525]' : 'bg-slate-50'}`}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }



  return (
    <div className={`min-h-screen py-6 sm:py-8 md:py-12 ${isDarkMode ? 'bg-[#252525]' : 'bg-linear-to-br from-blue-50 via-white to-purple-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t('checkout.title')}
          </h1>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{t('checkout.subtitle')}</p>
        </motion.div>
        
        <CheckoutProgress currentStep={currentStep} isDarkMode={isDarkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-10 md:mt-16">
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
  );
}
