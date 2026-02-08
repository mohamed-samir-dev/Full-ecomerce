import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n';

interface ErrorStateProps {
  isDarkMode: boolean;
}

export default function ErrorState({ isDarkMode }: ErrorStateProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-slate-900' : 'bg-linear-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {t('orderConfirmation.orderNotFound')}
        </h2>
        <button
          onClick={() => router.push('/pages/cart')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('orderConfirmation.returnToCart')}
        </button>
      </div>
    </div>
  );
}
