import { MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { ShippingInfoProps } from '../../types/types';

export default function ShippingInfo({ shippingAddress, isDarkMode, isArabic }: ShippingInfoProps) {
  const { t } = useTranslation();

  return (
    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'}`}>
      <div className={`flex items-center gap-2 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <MapPinIcon className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orders.shippingAddress')}
        </h4>
      </div>
      <div className={`text-sm leading-relaxed space-y-0.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isArabic ? 'text-right' : ''}`}>
        <p className="font-semibold">{shippingAddress.fullName}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
        <p>{shippingAddress.country}</p>
        <p className="pt-2 font-medium" style={{ color: '#C9A84C' }}>{shippingAddress.phone}</p>
      </div>
    </div>
  );
}
