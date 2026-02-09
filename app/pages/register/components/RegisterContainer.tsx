'use client';

import Link from 'next/link';
import RegisterForm from './RegisterForm';
import ErrorMessage from '@/app/components/common/ErrorMessage';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function RegisterContainer() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    error,
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword,
  } = useRegisterForm();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0D0F12]' : 'bg-gray-50'
    }`}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className={`p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-[#191C21]' : 'bg-white'
        }`}>
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-sans text-center mb-4 sm:mb-6 md:mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t('register.title')}
          </h1>
          
          <ErrorMessage message={error} />
          
          <RegisterForm
            formData={formData}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            loading={loading}
            onSubmit={handleSubmit}
            onShowPasswordToggle={() => setShowPassword(!showPassword)}
            onShowConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            onChange={handleChange}
          />
          
          <div className="mt-4 sm:mt-5 md:mt-6 text-center">
            <Link href="/pages/login" className={`text-xs sm:text-sm cursor-pointer transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            }`}>
              {t('register.haveAccount')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
