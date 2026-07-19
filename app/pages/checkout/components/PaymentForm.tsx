import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, Wallet, Lock, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { PaymentFormProps } from '../types/checkout';
import PaymentMethodOption from './paymentform/PaymentMethodOption';
import CardDetailsForm from './paymentform/CardDetailsForm';
import WalletDetailsForm from './paymentform/WalletDetailsForm';
import ShippingInfo from './paymentform/ShippingInfo';
import OrderNotesSection from './paymentform/OrderNotesSection';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function PaymentForm({
  paymentMethod, setPaymentMethod, notes, setNotes,
  isLoading, onBack, onSubmit, isDarkMode
}: PaymentFormProps) {
  const { t, isArabic } = useTranslation();
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [walletPhone, setWalletPhone] = useState('');

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-4"
    >
      {/* Payment methods card */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
            >
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('checkout.paymentMethod')}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {isArabic ? 'اختر طريقة الدفع المناسبة' : 'Choose your preferred payment method'}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <Lock className="w-3.5 h-3.5" />
            <span>{t('checkout.sslEncrypted')}</span>
          </div>
        </div>

        <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />

        {/* Methods */}
        <div className="space-y-2.5">
          <PaymentMethodOption
            id="cod" value="cod"
            label={t('checkout.cod')} description={t('checkout.codDesc')}
            icon={Truck} badge={t('checkout.noFees')}
            isSelected={paymentMethod === 'cod'} onSelect={setPaymentMethod}
            colorScheme="green" isDarkMode={isDarkMode}
          />
          <PaymentMethodOption
            id="card" value="stripe"
            label={t('checkout.card')} description={t('checkout.cardDesc')}
            icon={CreditCard} badge={t('checkout.secure')}
            isSelected={paymentMethod === 'stripe'} onSelect={setPaymentMethod}
            colorScheme="blue" isDarkMode={isDarkMode}
          />
          <PaymentMethodOption
            id="wallet" value="wallet"
            label={t('checkout.wallet')} description={t('checkout.walletDesc')}
            icon={Wallet} badge={t('checkout.fast')}
            isSelected={paymentMethod === 'wallet'} onSelect={setPaymentMethod}
            colorScheme="purple" isDarkMode={isDarkMode}
          />
        </div>

        {/* Conditional forms */}
        <AnimatePresence>
          {paymentMethod === 'stripe' && (
            <CardDetailsForm cardDetails={cardDetails} setCardDetails={setCardDetails} isDarkMode={isDarkMode} />
          )}
          {paymentMethod === 'wallet' && (
            <WalletDetailsForm walletPhone={walletPhone} setWalletPhone={setWalletPhone} isDarkMode={isDarkMode} />
          )}
          {paymentMethod === 'cod' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 p-4 rounded-xl border ${
                isDarkMode ? 'bg-[#191C21] border-[#C9A84C]/20' : 'bg-gray-50 border-[#C9A84C]/20'
              }`}
            >
              <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('checkout.cod')}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('checkout.codInfo')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notices */}
        <div className="mt-5 space-y-3">
          <div
            className={`flex items-start gap-3 p-3.5 rounded-xl border ${
              isDarkMode ? 'border-amber-500/20 bg-amber-500/5' : 'border-amber-200 bg-amber-50'
            } ${isArabic ? 'flex-row-reverse text-right' : ''}`}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <p className={`text-xs font-bold mb-0.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                {t('checkout.experimentalTitle')}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-amber-400/70' : 'text-amber-600'}`}>
                {t('checkout.experimentalDesc')}
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 p-3.5 rounded-xl border ${
              isDarkMode ? 'border-[#C9A84C]/20 bg-[#C9A84C]/5' : 'border-[#C9A84C]/20 bg-[#C9A84C]/5'
            } ${isArabic ? 'flex-row-reverse text-right' : ''}`}
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
            <div>
              <p className={`text-xs font-semibold mb-0.5 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {t('checkout.securityInfo')}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('checkout.securityDesc')}
              </p>
            </div>
          </div>
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
