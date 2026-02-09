import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function ContactCards() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  const cards = [
    { icon: '📧', titleKey: 'contact.cards.email', infoKey: 'contact.cards.emailInfo' },
    { icon: '📞', titleKey: 'contact.cards.phone', infoKey: 'contact.cards.phoneInfo' },
    { icon: '📍', titleKey: 'contact.cards.location', infoKey: 'contact.cards.locationInfo' },
    { icon: '⏰', titleKey: 'contact.cards.hours', infoKey: 'contact.cards.hoursInfo' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
        {cards.map((card) => (
          <div key={card.titleKey} className={`p-6 sm:p-8 rounded-2xl text-center shadow-xl hover:scale-105 transition-all duration-300 ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#B39E7A]/10 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">{card.icon}</span>
            </div>
            <h3 className={`text-sm sm:text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t(card.titleKey)}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t(card.infoKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
