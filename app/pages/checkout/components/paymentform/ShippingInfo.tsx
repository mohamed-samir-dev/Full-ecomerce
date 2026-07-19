import { Clock, Truck, Shield } from 'lucide-react';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function ShippingInfo({ isDarkMode }: { isDarkMode: boolean }) {
  const { t, isArabic } = useTranslation();

  const items = [
    { icon: Clock, color: '#C9A84C', title: t('checkout.deliveryTime'), desc: t('checkout.deliveryTimeDesc') },
    { icon: Truck, color: '#10b981', title: t('checkout.freeShipping'), desc: t('checkout.freeShippingDesc') },
    { icon: Shield, color: '#C9A84C', title: t('checkout.securePackaging'), desc: t('checkout.securePackagingDesc') },
  ];

  return (
    <div
      className={`rounded-2xl border p-5 ${
        isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'
      }`}
    >
      <div className={`flex items-center gap-2 mb-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <Truck className="w-4 h-4" style={{ color: '#C9A84C' }} />
        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('checkout.shippingInfo')}
        </h3>
      </div>

      <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(to right, #C9A84C30, transparent)' }} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, color, title, desc }) => (
          <div
            key={title}
            className={`flex items-start gap-3 p-3 rounded-xl ${
              isDarkMode ? 'bg-white/3' : 'bg-gray-50'
            } ${isArabic ? 'flex-row-reverse text-right' : ''}`}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}15` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <p className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</p>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
