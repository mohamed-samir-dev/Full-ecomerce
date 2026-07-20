import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline';
import { OrderStatusTimelineProps } from '../types/types';
import { useTranslation } from '@/i18n';

export default function OrderStatusTimeline({ createdAt, estimatedDelivery, isDarkMode }: OrderStatusTimelineProps) {
  const { t, locale } = useTranslation();

  const steps = [
    {
      icon: CheckCircleIcon,
      label: t('orderConfirmation.orderConfirmed'),
      sub: new Date(createdAt).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US'),
      done: true,
    },
    {
      icon: ClockIcon,
      label: t('orderConfirmation.processing'),
      sub: t('orderConfirmation.processingTime'),
      done: false,
    },
    {
      icon: TruckIcon,
      label: t('orderConfirmation.shipped'),
      sub: `${t('orderConfirmation.estimated')}: ${new Date(estimatedDelivery).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}`,
      done: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
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
          {t('orderConfirmation.orderStatus')}
        </h3>
      </div>
      <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                !step.done ? (isDarkMode ? 'bg-white/10' : 'bg-gray-100') : ''
              }`}
              style={step.done ? { background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' } : {}}
            >
              <step.icon className={`w-4 h-4 ${step.done ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{step.label}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
