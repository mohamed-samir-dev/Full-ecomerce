import { motion } from 'framer-motion';
import { CreditCard, Truck, Wallet, Lock, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';
import {PaymentFormProps}from '../types/checkout'
import PaymentMethodOption from './paymentform/PaymentMethodOption';
import CardDetailsForm from './paymentform/CardDetailsForm';
import WalletDetailsForm from './paymentform/WalletDetailsForm';
import ShippingInfo from './paymentform/ShippingInfo';
import OrderNotesSection from './paymentform/OrderNotesSection';

export default function PaymentForm({ 
  paymentMethod, 
  setPaymentMethod, 
  notes, 
  setNotes, 
  isLoading, 
  onBack, 
  onSubmit 
}: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [walletPhone, setWalletPhone] = useState('');
  
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border bg-white border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2 sm:mr-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Payment Method</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>SSL Encrypted</span>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <PaymentMethodOption
            id="cod"
            value="cod"
            label="Cash on Delivery"
            description="Pay when you receive your order"
            icon={Truck}
            badge="No Fees"
            isSelected={paymentMethod === 'cod'}
            onSelect={setPaymentMethod}
            colorScheme="green"
          />
          <PaymentMethodOption
            id="card"
            value="stripe"
            label="Credit/Debit Card"
            description="Pay securely with your card"
            icon={CreditCard}
            badge="Secure"
            isSelected={paymentMethod === 'stripe'}
            onSelect={setPaymentMethod}
            colorScheme="blue"
          />
          <PaymentMethodOption
            id="wallet"
            value="wallet"
            label="Mobile Wallet"
            description="Vodafone Cash, Orange Money, etc."
            icon={Wallet}
            badge="Fast"
            isSelected={paymentMethod === 'wallet'}
            onSelect={setPaymentMethod}
            colorScheme="purple"
          />
        </div>
        
        {paymentMethod === 'stripe' && (
          <CardDetailsForm cardDetails={cardDetails} setCardDetails={setCardDetails} />
        )}
        
        {paymentMethod === 'wallet' && (
          <WalletDetailsForm walletPhone={walletPhone} setWalletPhone={setWalletPhone} />
        )}
        
        {paymentMethod === 'cod' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 bg-white border-green-200"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Cash on Delivery</h3>
            <p className="text-xs sm:text-sm text-gray-600">You will pay when you receive your order</p>
          </motion.div>
        )}
        
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border-2 bg-amber-50 border-amber-300">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 text-amber-600" />
            <div className="text-xs sm:text-sm">
              <p className="font-bold mb-1 text-amber-800">Experimental Feature</p>
              <p className="text-amber-700">Online payment is currently in testing. We recommend Cash on Delivery.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border bg-blue-50 border-blue-200">
          <div className="flex items-start gap-2 sm:gap-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold mb-1 text-gray-700">Security Information</p>
              <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>
      
      <ShippingInfo />
      <OrderNotesSection notes={notes} setNotes={setNotes} isLoading={isLoading} onBack={onBack} onSubmit={onSubmit} />
    </motion.div>
  );
}
