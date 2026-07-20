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
      isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'
    }`}>
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('orderConfirmation.orderNotFound')}
        </h2>
        <button
          onClick={() => router.push('/pages/cart')}
          className="px-6 py-3 text-white rounded-xl font-medium transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          {t('orderConfirmation.returnToCart')}
        </button>
      </div>
    </div>
  );
}
