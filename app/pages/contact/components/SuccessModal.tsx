import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`relative max-w-md w-full p-8 rounded-3xl shadow-2xl transform transition-all ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('contact.modal.title')}
          </h3>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('contact.modal.subtitle')}
          </p>
          <button
            onClick={onClose}
            aria-label={t('contact.modal.close')}
            className="w-full bg-gradient-to-r from-[#B39E7A] to-[#9d8a68] hover:from-[#9d8a68] hover:to-[#8a7759] text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            {t('contact.modal.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
