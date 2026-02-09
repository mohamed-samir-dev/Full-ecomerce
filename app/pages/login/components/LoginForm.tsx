'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import{LoginFormProps} from '../types/login.types';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function LoginForm({
  formData,
  showPassword,
  rememberMe,
  loading,
  onSubmit,
  onShowPasswordToggle,
  onRememberMeChange,
  onChange
}: LoginFormProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
      <div>
        <input
          name="email"
          type="email"
          required
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C7AB6C] focus:border-transparent transition-colors ${
            isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400 border-gray-700' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
          }`}
          placeholder={t('login.email')}
          value={formData.email}
          onChange={onChange}
        />
      </div>
      
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C7AB6C] focus:border-transparent transition-colors ${
            isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400 border-gray-700' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
          }`}
          placeholder={t('login.password')}
          value={formData.password}
          onChange={onChange}
        />
        <button
          type="button"
          className={`absolute ${isArabic ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} top-1/2 transform -translate-y-1/2 p-1 transition-colors ${
            isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={onShowPasswordToggle}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      </div>
      
      <div className="flex items-center justify-start">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 transition-all duration-200 ${
              rememberMe 
                ? 'bg-[#C7AB6C] border-[#C7AB6C]' 
                : 'border-gray-300 group-hover:border-[#C7AB6C]'
            }`}>
              {rememberMe && (
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span className={`text-xs sm:text-sm ${isArabic ? 'mr-2 sm:mr-3' : 'ml-2 sm:ml-3'} transition-colors ${
            isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-800'
          }`}>{t('login.rememberMe')}</span>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-[#C6A96D] cursor-pointer hover:bg-[#96753C] text-black font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t('login.loggingIn') : t('login.loginButton')}
      </button>
    </form>
  );
}
