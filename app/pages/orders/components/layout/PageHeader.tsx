import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';

interface PageHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function PageHeader({ isDarkMode, isArabic }: PageHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <ClipboardDocumentListIcon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
      <div className={isArabic ? 'text-right' : 'text-left'}>
        <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {t('orders.title')}
        </h1>
        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {t('orders.subtitle')}
        </p>
      </div>
    </div>
  );
}
