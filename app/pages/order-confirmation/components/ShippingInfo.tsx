import {ShippingInfoProps} from '../types/types'
import { useTranslation } from '@/i18n';

export default function ShippingInfo({ shippingAddress, isPrivateView, isDarkMode }: ShippingInfoProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.shippingAddress')}</h3>
      <div className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        <p className="font-medium">{isPrivateView ? '••••••••••' : shippingAddress.fullName}</p>
        <p>{isPrivateView ? '••••••••••••••••••••' : shippingAddress.address}</p>
        <p>{isPrivateView ? '••••••••' : `${shippingAddress.city}, ${shippingAddress.postalCode}`}</p>
        <p>{isPrivateView ? '••••••••' : shippingAddress.country}</p>
        <p className="pt-2">{isPrivateView ? '••••••••••••' : shippingAddress.phone}</p>
      </div>
    </div>
  );
}
