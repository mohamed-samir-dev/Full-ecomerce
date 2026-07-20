import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { PaymentFormProps } from '../types/checkout';
import ShippingInfo from './paymentform/ShippingInfo';
import OrderNotesSection from './paymentform/OrderNotesSection';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function PaymentForm({
  notes, setNotes,
  isLoading, onBack, onSubmit, isDarkMode
}: Omit<PaymentFormProps, 'paymentMethod' | 'setPaymentMethod'>) {
  const { t, isArabic } = useTranslation();

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-4"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            <Truck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('checkout.paymentMethod')}
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
            </p>
          </div>
        </div>

        <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />

        <div
          className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-[#191C21] border-[#C9A84C]/20' : 'bg-gray-50 border-[#C9A84C]/20'
          }`}
        >
          <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {t('checkout.cod')}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('checkout.codInfo')}
          </p>
        </div>
      </div>

      <ShippingInfo isDarkMode={isDarkMode} />
      <OrderNotesSection
        notes={notes} setNotes={setNotes}
        isLoading={isLoading} onBack={onBack} onSubmit={onSubmit}
        isDarkMode={isDarkMode}
      />
    </motion.div>
  );
}
