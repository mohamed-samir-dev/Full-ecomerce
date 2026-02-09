'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import{RegisterFormProps}from '../types/register.types';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';


export default function RegisterForm({
  formData,
  showPassword,
  showConfirmPassword,
  loading,
  onSubmit,
  onShowPasswordToggle,
  onShowConfirmPasswordToggle,
  onChange
}: RegisterFormProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const inputClasses = `w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-md transition-colors border ${
    isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400 border-gray-700' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
  }`;

  return (
    <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        <div>
          <input
            name="firstName"
            type="text"
            required
            className={inputClasses}
            placeholder={t('register.firstName')}
            value={formData.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            name="lastName"
            type="text"
            required
            className={inputClasses}
            placeholder={t('register.lastName')}
            value={formData.lastName}
            onChange={onChange}
          />
        </div>
      </div>
      
      <div>
        <input
          name="email"
          type="email"
          required
          className={inputClasses}
          placeholder={t('register.email')}
          value={formData.email}
          onChange={onChange}
        />
      </div>
      
      <div>
        <input
          name="phone"
          type="tel"
          required
          className={inputClasses}
          placeholder={t('register.phone')}
          value={formData.phone}
          onChange={onChange}
          dir="ltr"
        />
      </div>
      
      <div>
        <input
          name="dateOfBirth"
          type="date"
          required
          className={inputClasses}
          placeholder={t('register.dateOfBirth')}
          value={formData.dateOfBirth}
          onChange={onChange}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className={`w-full ${isArabic ? 'pl-10 sm:pl-12 pr-3 sm:pr-4' : 'pl-3 sm:pl-4 pr-10 sm:pr-12'} py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-md border-2 transition-all duration-300 focus:outline-none ${
              isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'
            } ${
              formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
                ? 'border-green-500 focus:border-green-400'
                : formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                ? 'border-red-500 focus:border-red-400'
                : isDarkMode ? 'border-gray-700 focus:border-[#C7AB6C]' : 'border-transparent focus:border-[#C7AB6C]'
            }`}
            placeholder={t('register.password')}
            value={formData.password}
            onChange={onChange}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onDrag={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            autoComplete="new-password"
          />
          <button
            type="button"
            className={`absolute ${isArabic ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} top-1/2 transform -translate-y-1/2 transition-colors duration-200 z-10 ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={onShowPasswordToggle}
          >
            {showPassword ? <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> : <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
          </button>
        </div>
        
        {formData.password && (
          <PasswordStrengthIndicator password={formData.password} />
        )}
      </div>
      
      <div className="relative">
        <input
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          className={`w-full ${isArabic ? 'pl-10 sm:pl-12 pr-3 sm:pr-4' : 'pl-3 sm:pl-4 pr-10 sm:pr-12'} py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-md border-2 transition-colors ${
            isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          } ${
            formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
              ? 'border-green-500 focus:border-green-400'
              : formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
              ? 'border-red-500 focus:border-red-400'
              : isDarkMode ? 'border-gray-700 focus:border-[#C7AB6C]' : 'border-transparent focus:border-[#C7AB6C]'
          }`}
          placeholder={t('register.confirmPassword')}
          value={formData.confirmPassword}
          onChange={onChange}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onDrag={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          autoComplete="new-password"
        />
        <button
          type="button"
          className={`absolute ${isArabic ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} top-1/2 transform -translate-y-1/2 z-10 transition-colors ${
            isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={onShowConfirmPasswordToggle}
        >
          {showConfirmPassword ? <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> : <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
        </button>
      </div>
      
      <div className={`flex items-start ${isArabic ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3 md:space-x-4`}>
        <input
          name="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={onChange}
          className={`mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 text-[#C7AB6C] rounded focus:ring-[#C7AB6C] shrink-0 ${
            isDarkMode ? 'bg-[#0D0F12] border-gray-700' : 'bg-gray-50 border-gray-300'
          }`}
        />
        <label className={`text-xs sm:text-sm md:text-base leading-relaxed transition-colors ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {t('register.agreeToTerms')} <span className="text-[#C7AB6C] cursor-pointer hover:underline">{t('register.termsOfService')}</span> {t('register.and')} <span className="text-[#C7AB6C] cursor-pointer hover:underline">{t('register.privacyPolicy')}</span>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={loading || !formData.agreeToTerms}
        className="w-full py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-medium rounded-full transition-all duration-300 bg-[#C7AB6C] hover:bg-[#96753C] text-black cursor-pointer transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? t('register.creatingAccount') : t('register.createAccount')}
      </button>
    </form>
  );
}
