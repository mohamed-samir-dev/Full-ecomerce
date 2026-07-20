import { motion } from 'framer-motion';
import { TruckIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { DeliveryInfoProps } from '../types/types';
import { useTranslation } from '@/i18n';

export default function DeliveryInfo({ estimatedDelivery, isDarkMode }: DeliveryInfoProps) {
  const { t, locale } = useTranslation();

  const items = [
    {
      icon: TruckIcon,
      label: t('orderConfirmation.estimatedDelivery'),
      sub: new Date(estimatedDelivery).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    },
    {
      icon: ShieldCheckIcon,
      label: t('orderConfirmation.secureDelivery'),
      sub: t('orderConfirmation.signatureRequired'),
    },
    {
      icon: ClockIcon,
      label: t('orderConfirmation.trackingAvailable'),
      sub: t('orderConfirmation.within24Hours'),
    },
  ];

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
          <TruckIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orderConfirmation.deliveryInfo')}
        </h3>
      </div>
      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
