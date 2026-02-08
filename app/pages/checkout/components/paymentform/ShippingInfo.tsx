import { Package, Clock, Truck, Shield } from 'lucide-react';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function ShippingInfo() {
  const { t, isArabic } = useTranslation();
  
  return (
    <div className="rounded-2xl shadow-lg p-4 sm:p-6 border bg-linear-to-r from-blue-50 to-purple-50 border-blue-100">
      <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center text-gray-800">
        <Package className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? 'ml-2' : 'mr-2'} text-blue-600`} />
        {t('checkout.shippingInfo')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="flex items-start">
          <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'} text-blue-600 shrink-0 mt-1`} />
          <div>
            <p className="font-semibold text-xs sm:text-sm text-gray-800">{t('checkout.deliveryTime')}</p>
            <p className="text-xs text-gray-600">{t('checkout.deliveryTimeDesc')}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Truck className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'} text-green-600 shrink-0 mt-1`} />
          <div>
            <p className="font-semibold text-xs sm:text-sm text-gray-800">{t('checkout.freeShipping')}</p>
            <p className="text-xs text-gray-600">{t('checkout.freeShippingDesc')}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'} text-purple-600 shrink-0 mt-1`} />
          <div>
            <p className="font-semibold text-xs sm:text-sm text-gray-800">{t('checkout.securePackaging')}</p>
            <p className="text-xs text-gray-600">{t('checkout.securePackagingDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
