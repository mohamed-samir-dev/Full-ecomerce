import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { EmptyStateProps } from '../../types/types';

export default function EmptyState({ statusFilter, isDarkMode }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className={`text-center py-16 rounded-2xl border border-dashed ${
      isDarkMode ? 'border-white/10 bg-[#1F2329]' : 'border-black/10 bg-white'
    }`}>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: '#C9A84C18' }}
      >
        <ClipboardDocumentListIcon className="w-8 h-8" style={{ color: '#C9A84C' }} />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('orders.empty.title')}
      </h3>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {statusFilter === 'all' ? t('orders.empty.noOrders') : t('orders.empty.noStatus')}
      </p>
    </div>
  );
}
