import { ClipboardDocumentListIcon, HeartIcon, MapPinIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import {ProfileStatsProps}from '../types/types'


export default function ProfileStats({ user, isDarkMode }: ProfileStatsProps) {
  const { t, isArabic } = useTranslation();
  
  const stats = [
    {
      icon: ClipboardDocumentListIcon,
      label: t('profile.orders'),
      value: user.orders?.length || 0,
      color: 'blue'
    },
    {
      icon: HeartIcon,
      label: t('profile.wishlist'),
      value: user.wishlist?.length || 0,
      color: 'red'
    },
    {
      icon: ShoppingCartIcon,
      label: t('profile.cart'),
      value: user.cart?.length || 0,
      color: 'orange'
    },
    {
      icon: MapPinIcon,
      label: t('profile.addresses'),
      value: user.addresses?.length || 0,
      color: 'green'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          icon: 'text-blue-500'
        };
      case 'red':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          icon: 'text-red-500'
        };
      case 'orange':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-600',
          icon: 'text-orange-500'
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          icon: 'text-green-500'
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-600',
          icon: 'text-slate-500'
        };
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        const Icon = stat.icon;
        
        return (
          <div
            key={index}
            className={`rounded-lg sm:rounded-xl border-2 p-3 sm:p-4 md:p-6 shadow-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}
          >
            <div className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
              <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700' : colors.bg}`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-slate-300' : colors.icon}`} />
              </div>
              
              <div className={`text-center sm:text-left ${isArabic ? 'sm:text-right' : ''}`}>
                <p className={`text-lg sm:text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}