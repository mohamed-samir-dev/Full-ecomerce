import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { isArabic } = useLanguage();
  const { isDarkMode } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 max-w-sm w-full mx-4 ${
        isDarkMode ? 'bg-[#23272F]' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{isArabic ? 'تسجيل الدخول مطلوب' : 'Login Required'}</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{isArabic ? 'الرجاء تسجيل الدخول لكتابة مراجعة' : 'Please log in to write a review'}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isArabic ? 'حسناً' : 'OK'}
        </button>
      </div>
    </div>
  );
}
