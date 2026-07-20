import { FunnelIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';
import { StatusFilterProps } from '../../types/types';

export default function StatusFilter({ value, onChange, isDarkMode, isArabic }: StatusFilterProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <FunnelIcon className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-2 text-sm rounded-xl border font-medium transition-all outline-none ${
          isDarkMode
            ? 'bg-[#1F2329] border-white/10 text-white focus:border-[#C9A84C]/50'
            : 'bg-white border-black/10 text-gray-900 focus:border-[#C9A84C]/50'
        }`}
      >
        <option value="all">{t('orders.filter.all')}</option>
        <option value="processing">{t('orders.filter.processing')}</option>
        <option value="shipped">{t('orders.filter.shipped')}</option>
        <option value="delivered">{t('orders.filter.delivered')}</option>
        <option value="cancelled">{t('orders.filter.cancelled')}</option>
      </select>
    </div>
  );
}
