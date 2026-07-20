import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';

interface PageHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function PageHeader({ isDarkMode, isArabic }: PageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-3 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
      >
        <ClipboardDocumentListIcon className="w-5 h-5 text-white" />
      </div>
      <div className={isArabic ? 'text-right' : 'text-left'}>
        <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orders.title')}
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('orders.subtitle')}
        </p>
      </div>
      <div className="mt-1 h-px flex-1" style={{ background: 'linear-gradient(to right, #C9A84C40, transparent)' }} />
    </div>
  );
}
