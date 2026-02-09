import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { OrderItemsProps } from '../types/types';
import { useTranslation } from '@/i18n';
import Image from 'next/image';



export default function OrderItems({ products, isPrivateView, isDarkMode }: OrderItemsProps) {
  const { t, locale } = useTranslation();
  
  return (
    <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('orderConfirmation.orderItems')} ({products.length})</h3>
      <div className="space-y-4">
        {products.map((item, index) => (
          <div key={index} className={`flex gap-4 pb-4 ${index !== products.length - 1 ? 'border-b' : ''} ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className={`w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={locale === 'ar' && item.nameAr ? item.nameAr : item.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<svg class="w-10 h-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
                  }}
                />
              ) : (
                <DocumentTextIcon className={`w-10 h-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isPrivateView ? '••••••••••••••' : (locale === 'ar' && item.nameAr ? item.nameAr : item.name)}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t('orderConfirmation.quantity')}: {item.quantity}</p>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t('orderConfirmation.unitPrice')}: ${isPrivateView ? '••••' : item.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${isPrivateView ? '••••' : (item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
