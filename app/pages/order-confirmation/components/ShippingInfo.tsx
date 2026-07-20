import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { ShippingInfoProps } from '../types/types';
import { useTranslation } from '@/i18n';

export default function ShippingInfo({ shippingAddress, isPrivateView, isDarkMode }: ShippingInfoProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`rounded-2xl border p-6 transition-all ${
        isDarkMode
          ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/20'
          : 'bg-white border-black/5 hover:border-[#C9A84C]/20'
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <MapPinIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orderConfirmation.shippingAddress')}
        </h3>
      </div>
      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />
      <div className={`text-sm space-y-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="font-medium">{isPrivateView ? '••••••••••' : shippingAddress.fullName}</p>
        <p>{isPrivateView ? '••••••••••••••••••••' : shippingAddress.address}</p>
        <p>{isPrivateView ? '••••••••' : `${shippingAddress.city}, ${shippingAddress.postalCode}`}</p>
        <p>{isPrivateView ? '••••••••' : shippingAddress.country}</p>
        <p className="pt-1" style={{ color: '#C9A84C' }}>{isPrivateView ? '••••••••••••' : shippingAddress.phone}</p>
      </div>
    </motion.div>
  );
}
