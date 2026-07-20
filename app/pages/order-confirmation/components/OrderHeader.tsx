import { motion } from 'framer-motion';
import { CheckCircleIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { OrderHeaderProps } from '../types/types';
import { useTranslation } from '@/i18n';

export default function OrderHeader({ orderId, createdAt, isPrivateView, isDarkMode, onTogglePrivacy }: OrderHeaderProps) {
  const { t, locale } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            <CheckCircleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('orderConfirmation.title')}
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('orderConfirmation.orderNumber')} {isPrivateView ? '••••••••' : orderId.slice(-8)}
            </p>
          </div>
        </div>
        <button
          onClick={onTogglePrivacy}
          className={`p-2 rounded-xl transition-all ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
        >
          {isPrivateView
            ? <EyeSlashIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            : <EyeIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          }
        </button>
      </div>
      <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {t('orderConfirmation.orderPlacedOn')}{' '}
        {new Date(createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}{' '}
        {t('orderConfirmation.at')}{' '}
        {new Date(createdAt).toLocaleTimeString(locale === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
      </p>
      <div className="mt-5 h-px w-full" style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }} />
    </motion.div>
  );
}
