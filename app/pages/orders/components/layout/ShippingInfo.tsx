import { MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import {ShippingInfoProps}from '../../types/types'


export default function ShippingInfo({ shippingAddress, isDarkMode, isArabic }: ShippingInfoProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <MapPinIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h4 className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {t('orders.shippingAddress')}
        </h4>
      </div>
      <div className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${isArabic ? 'text-right' : 'text-left'}`}>
        <p className="font-bold text-sm sm:text-base mb-2">{shippingAddress.fullName}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
        <p className="font-semibold mt-1">{shippingAddress.country}</p>
        <p className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <span className="font-semibold">{t('orders.phone')}:</span> {shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}
