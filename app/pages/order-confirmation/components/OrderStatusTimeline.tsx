import { CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline';
import {OrderStatusTimelineProps}from '../types/types'
import { useTranslation } from '@/i18n';


export default function OrderStatusTimeline({ createdAt, estimatedDelivery, isDarkMode }: OrderStatusTimelineProps) {
  const { t, locale } = useTranslation();
  
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.orderStatus')}</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.orderConfirmed')}</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{new Date(createdAt).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <ClockIcon className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </div>
          <div className="flex-1">
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.processing')}</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t('orderConfirmation.processingTime')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <TruckIcon className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </div>
          <div className="flex-1">
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.shipped')}</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t('orderConfirmation.estimated')}: {new Date(estimatedDelivery).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
