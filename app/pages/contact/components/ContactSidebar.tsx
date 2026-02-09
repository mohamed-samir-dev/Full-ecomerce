import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function ContactSidebar() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  const benefits = [
    { titleKey: 'contact.sidebar.quickResponse', descKey: 'contact.sidebar.quickResponseDesc' },
    { titleKey: 'contact.sidebar.expertSupport', descKey: 'contact.sidebar.expertSupportDesc' },
    { titleKey: 'contact.sidebar.personalizedCare', descKey: 'contact.sidebar.personalizedCareDesc' }
  ];

  const hours = [
    { dayKey: 'contact.sidebar.monday', timeKey: 'contact.sidebar.mondayTime', active: true },
    { dayKey: 'contact.sidebar.saturday', timeKey: 'contact.sidebar.saturdayTime', active: true },
    { dayKey: 'contact.sidebar.sunday', timeKey: 'contact.sidebar.sundayTime', active: false }
  ];

  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
      <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
        <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.sidebar.whyReachOut')}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit.titleKey} className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#B39E7A]/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-sm sm:text-base text-[#B39E7A]">✓</span>
              </div>
              <div>
                <h4 className={`text-sm sm:text-base font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t(benefit.titleKey)}</h4>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t(benefit.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border ${isDarkMode ? 'bg-[#1F2329] border-[#B39E7A]/20' : 'bg-gradient-to-br from-[#B39E7A]/10 to-[#B39E7A]/5 border-[#B39E7A]/20'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.sidebar.businessHours')}
        </h3>
        <div className="space-y-2">
          {hours.map((hour) => (
            <div key={hour.dayKey} className="flex justify-between text-sm sm:text-base">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{t(hour.dayKey)}</span>
              <span className={`font-semibold ${hour.active ? 'text-[#B39E7A]' : isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {t(hour.timeKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
