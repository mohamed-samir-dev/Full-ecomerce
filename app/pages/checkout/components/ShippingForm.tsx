import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import FormInput from './shippingform/FormInput';
import FormSelect from './shippingform/FormSelect';
import { ShippingFormProps } from '../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function ShippingForm({
  shippingAddress, setShippingAddress,
  governorate, setGovernorate, governorates,
  onSubmit, isDarkMode
}: ShippingFormProps) {
  const { t, isArabic } = useTranslation();
  const [phoneError, setPhoneError] = useState('');

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
      }`}
    >
      {/* Section header */}
      <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isArabic ? 'text-right' : ''}`}>
            {t('checkout.shippingAddress')}
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'أدخل بيانات الشحن بدقة' : 'Enter your shipping details accurately'}
          </p>
        </div>
      </div>

      <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />

      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          label={t('checkout.fullName')}
          required
          value={shippingAddress.fullName}
          onChange={(v) => setShippingAddress(p => ({ ...p, fullName: v }))}
          placeholder={t('checkout.fullNamePlaceholder')}
          isDarkMode={isDarkMode}
        />

        <FormInput
          label={t('checkout.address')}
          required
          value={shippingAddress.address}
          onChange={(v) => setShippingAddress(p => ({ ...p, address: v }))}
          placeholder={t('checkout.addressPlaceholder')}
          isDarkMode={isDarkMode}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label={t('checkout.governorate')}
            required
            value={governorate}
            onChange={(v) => { setGovernorate(v); setShippingAddress(p => ({ ...p, city: v })); }}
            options={governorates}
            placeholder={t('checkout.selectGovernorate')}
            isDarkMode={isDarkMode}
          />

          <FormInput
            label={t('checkout.district')}
            required
            value={shippingAddress.country}
            onChange={(v) => setShippingAddress(p => ({ ...p, country: v }))}
            placeholder={t('checkout.districtPlaceholder')}
            isDarkMode={isDarkMode}
          />
        </div>

        <div>
          <FormInput
            label={t('checkout.phone')}
            type="tel"
            required
            value={shippingAddress.phone}
            onChange={(v) => {
              const digits = v.replace(/[^0-9]/g, '');
              setShippingAddress(p => ({ ...p, phone: digits }));
              if (digits.length > 0 && (digits.length !== 10 || !digits.startsWith('01')))
                setPhoneError(isArabic ? 'رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 01' : 'Phone number must be 10 digits and start with 01');
              else
                setPhoneError('');
            }}
            maxLength={10}
            inputMode="numeric"
            placeholder="0123456789"
            icon={<Phone className="w-4 h-4" style={{ color: '#C9A84C' }} />}
            isDarkMode={isDarkMode}
          />
          {phoneError && (
            <p className={`text-xs mt-1.5 text-red-500 ${isArabic ? 'text-right' : ''}`}>{phoneError}</p>
          )}
        </div>

        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            {t('checkout.continueToPayment')}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
