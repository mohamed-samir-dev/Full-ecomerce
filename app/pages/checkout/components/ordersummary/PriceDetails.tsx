import { motion } from 'framer-motion';
import { TruckIcon, Shield } from 'lucide-react';
import {PriceDetailsProps}from '../../types/checkout'
import { useTranslation } from '@/i18n/hooks/useTranslation';


export default function PriceDetails({ subtotal, shipping, tax, finalTotal, deliveryDateStr }: PriceDetailsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="border-t-2 pt-4 space-y-3 border-gray-100">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{t('checkout.subtotal')}</span>
        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm text-gray-600">{t('checkout.shipping')}</span>
          {shipping === 0 && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
              {t('checkout.qualified')}
            </span>
          )}
        </div>
        <span className={`text-sm sm:text-base font-medium ${
          shipping === 0 ? 'text-emerald-600' : 'text-gray-900'
        }`}>
          {shipping === 0 ? t('checkout.free') : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{t('checkout.tax')}</span>
        <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between items-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-blue-50">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">{t('checkout.estDelivery')}</span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-blue-600">
          {deliveryDateStr}
        </span>
      </div>
      
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="flex justify-between items-center font-bold text-lg sm:text-xl pt-4 border-t-2 border-gray-200"
      >
        <span className="text-gray-900">{t('checkout.total')}</span>
        <span className="text-xl sm:text-2xl bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ${finalTotal.toFixed(2)}
        </span>
      </motion.div>
      
      <div className="p-4 rounded-xl mt-4 border bg-linear-to-r from-blue-50 to-purple-50 border-blue-100">
        <p className="text-xs flex items-center text-gray-700">
          <Shield className="inline w-4 h-4 mr-2 text-blue-600" />
          <span className="font-semibold">{t('checkout.secureCheckout')}</span>
        </p>
      </div>
      
      {subtotal < 100 && (
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-200">
          <p className="text-xs text-gray-600">
            {t('checkout.addMoreForFreeShipping').replace('{{amount}}', (100 - subtotal).toFixed(2))}
          </p>
        </div>
      )}
    </div>
  );
}
