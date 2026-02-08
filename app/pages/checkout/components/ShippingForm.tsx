import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import FormInput from './shippingform/FormInput';
import FormSelect from './shippingform/FormSelect';
import {ShippingFormProps}from '../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';


export default function ShippingForm({ 
  shippingAddress, 
  setShippingAddress, 
  governorate, 
  setGovernorate, 
  governorates,
  onSubmit 
}: ShippingFormProps) {
  const { t, isArabic } = useTranslation();
  
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border bg-white border-gray-100"
    >
      <div className="flex items-center mb-4 sm:mb-6">
        <MapPin className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 ${isArabic ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`} />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t('checkout.shippingAddress')}</h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <FormInput
          label={t('checkout.fullName')}
          required
          value={shippingAddress.fullName}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, fullName: value }))}
          placeholder={t('checkout.fullNamePlaceholder')}
        />
        
        <FormInput
          label={t('checkout.address')}
          required
          value={shippingAddress.address}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, address: value }))}
          placeholder={t('checkout.addressPlaceholder')}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <FormSelect
            label={t('checkout.governorate')}
            required
            value={governorate}
            onChange={(value) => {
              setGovernorate(value);
              setShippingAddress(prev => ({ ...prev, city: value }));
            }}
            options={governorates}
            placeholder={t('checkout.selectGovernorate')}
          />
          
          <FormInput
            label={t('checkout.postalCode')}
            required
            value={shippingAddress.postalCode}
            onChange={(value) => setShippingAddress(prev => ({ ...prev, postalCode: value }))}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            inputMode="numeric"
            placeholder="12345"
            helperText={t('checkout.postalCodeHelper')}
          />
        </div>
        
        <FormInput
          label={t('checkout.district')}
          required
          value={shippingAddress.country}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, country: value }))}
          placeholder={t('checkout.districtPlaceholder')}
        />
        
        <FormInput
          label={t('checkout.phone')}
          type="tel"
          required
          value={shippingAddress.phone}
          onChange={(value) => setShippingAddress(prev => ({ ...prev, phone: value }))}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          maxLength={11}
          pattern="[0-9]{11}"
          inputMode="numeric"
          placeholder="01234567890"
          icon={<Phone className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'} text-blue-600`} />}
          helperText={t('checkout.phoneValidation')}
        />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {t('checkout.continueToPayment')}
        </motion.button>
      </form>
    </motion.div>
  );
}
