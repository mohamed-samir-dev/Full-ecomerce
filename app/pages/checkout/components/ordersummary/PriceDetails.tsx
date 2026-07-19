import { TruckIcon, Shield } from 'lucide-react';
import { PriceDetailsProps } from '../../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function PriceDetails({ subtotal, shipping, tax, finalTotal, deliveryDateStr, isDarkMode }: PriceDetailsProps) {
  const { t, isArabic } = useTranslation();

  const row = (label: React.ReactNode, value: React.ReactNode) => (
    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
      {label}
      {value}
    </div>
  );

  return (
    <div className="space-y-3 pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}>
      {row(
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('checkout.subtotal')}</span>,
        <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {subtotal.toFixed(2)} {isArabic ? 'ج.م' : 'EGP'}
        </span>
      )}

      {row(
        <div className={`flex items-center gap-1.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('checkout.shipping')}</span>
          {shipping === 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium text-emerald-600 bg-emerald-50">
              {t('checkout.qualified')}
            </span>
          )}
        </div>,
        <span className={`text-sm font-semibold ${shipping === 0 ? 'text-emerald-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {shipping === 0 ? t('checkout.free') : `${shipping.toFixed(2)} ${isArabic ? 'ج.م' : 'EGP'}`}
        </span>
      )}

      {row(
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('checkout.tax')}</span>,
        <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {tax.toFixed(2)} {isArabic ? 'ج.م' : 'EGP'}
        </span>
      )}

      {/* Delivery */}
      <div
        className={`flex items-center justify-between p-3 rounded-xl ${isArabic ? 'flex-row-reverse' : ''}`}
        style={{ background: isDarkMode ? '#C9A84C10' : '#C9A84C08' }}
      >
        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <TruckIcon className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('checkout.estDelivery')}
          </span>
        </div>
        <span className="text-xs font-semibold" style={{ color: '#C9A84C' }}>{deliveryDateStr}</span>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }} />

      {/* Total */}
      <div className={`flex items-center justify-between pt-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('checkout.total')}
        </span>
        <span className="text-xl font-bold" style={{ color: '#C9A84C' }}>
          {finalTotal.toFixed(2)}
          <span className={`text-xs font-normal ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isArabic ? 'ج.م' : 'EGP'}
          </span>
        </span>
      </div>

      {/* Secure badge */}
      <div
        className={`flex items-center gap-2 p-3 rounded-xl border ${
          isDarkMode ? 'border-[#C9A84C]/20 bg-[#C9A84C]/5' : 'border-[#C9A84C]/20 bg-[#C9A84C]/5'
        } ${isArabic ? 'flex-row-reverse' : ''}`}
      >
        <Shield className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
        <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('checkout.secureCheckout')}
        </span>
      </div>

      {subtotal < 15000 && (
        <div
          className={`p-3 rounded-xl border ${
            isDarkMode ? 'border-amber-500/20 bg-amber-500/5' : 'border-amber-200 bg-amber-50'
          }`}
        >
          <p className={`text-xs ${isDarkMode ? 'text-amber-400/80' : 'text-amber-600'}`}>
            {t('checkout.addMoreForFreeShipping').replace('{{amount}}', (15000 - subtotal).toFixed(2))}
          </p>
        </div>
      )}
    </div>
  );
}
