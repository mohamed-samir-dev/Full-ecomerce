'use client';

import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function About() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  const timeline = [
    { year: '2020', titleKey: 'about.timeline.founded', descKey: 'about.timeline.foundedDesc' },
    { year: '2021', titleKey: 'about.timeline.growing', descKey: 'about.timeline.growingDesc' },
    { year: '2022', titleKey: 'about.timeline.expansion', descKey: 'about.timeline.expansionDesc' },
    { year: '2023', titleKey: 'about.timeline.innovation', descKey: 'about.timeline.innovationDesc' },
    { year: '2024', titleKey: 'about.timeline.leader', descKey: 'about.timeline.leaderDesc' }
  ];
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Hero */}
      <div className={`py-12 md:py-20 ${isDarkMode ? 'bg-linear-to-b from-[#1F2329] to-[#191C21]' : 'bg-linear-to-b from-white to-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about.hero.title')} <span className="text-[#B39E7A]">{t('about.hero.brand')}</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('about.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className={`py-12 md:py-20 ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about.journey.title')}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#C1B092] hidden md:block"></div>
            
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative mb-8 md:mb-16 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className={`md:flex ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className={`p-4 sm:p-6 rounded-xl hover:scale-105 transition-transform ${isDarkMode ? 'bg-[#252A31]' : 'bg-gray-50'}`}>
                      <div className="text-xl sm:text-2xl font-bold mb-2 text-[#B39E7A]">
                        {item.year}
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {t(item.titleKey)}
                      </h3>
                      <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full border-4 bg-[#B39E7A] ${isDarkMode ? 'border-[#1F2329]' : 'border-white'}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('about.features.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className={`p-4 sm:p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✨</div>
            <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.quality')}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.features.qualityDesc')}</p>
          </div>
          
          <div className={`p-4 sm:p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
            <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.shipping')}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.features.shippingDesc')}</p>
          </div>
          
          <div className={`p-4 sm:p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💎</div>
            <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.prices')}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.features.pricesDesc')}</p>
          </div>
          
          <div className={`p-4 sm:p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔒</div>
            <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.secure')}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.features.secureDesc')}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
