'use client';

import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { LoginFormProps } from '../types/login.types';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { useCapsLock } from '@/app/hooks/useCapsLock';

const COMMON_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

function getEmailSuggestion(email: string): string | null {
  const atIdx = email.lastIndexOf('@');
  if (atIdx < 1) return null;
  const domain = email.slice(atIdx + 1).toLowerCase();
  if (!domain || domain.includes('.')) return null; // already has a dot → probably typed correctly
  const match = COMMON_DOMAINS.find(d => d.startsWith(domain) && d !== domain);
  return match ? `${email.slice(0, atIdx + 1)}${match}` : null;
}

export default function LoginForm({
  formData,
  showPassword,
  rememberMe,
  loading,
  emailError,
  onSubmit,
  onShowPasswordToggle,
  onRememberMeChange,
  onChange
}: LoginFormProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const { capsLock, onKeyDown, onKeyUp } = useCapsLock();

  const suggestion = getEmailSuggestion(formData.email);

  const inputBase = `w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C7AB6C] focus:border-transparent transition-colors ${
    isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400 border-gray-700' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
  }`;

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">

      {/* Google Login */}
      <button
        type="button"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 text-sm sm:text-base rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {t('login.continueWithGoogle')}
      </button>

      <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <div className={`flex-1 h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        {t('login.or')}
        <div className={`flex-1 h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          type="email"
          required
          className={`${inputBase} ${emailError ? 'border-red-500 focus:ring-red-400' : ''}`}
          placeholder={t('login.email')}
          value={formData.email}
          onChange={onChange}
          autoComplete="email"
        />
        {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
        {suggestion && !emailError && (
          <p className="mt-1 text-xs text-[#C7AB6C]">
            {isArabic ? 'هل تقصد' : 'Did you mean'}{' '}
            <button
              type="button"
              className="underline font-medium"
              onClick={() => onChange({ target: { name: 'email', value: suggestion } } as React.ChangeEvent<HTMLInputElement>)}
            >
              {suggestion}
            </button>
            {isArabic ? '؟' : '?'}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className={inputBase}
            placeholder={t('login.password')}
            value={formData.password}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            autoComplete="current-password"
          />
          <button
            type="button"
            className={`absolute ${isArabic ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} top-1/2 -translate-y-1/2 p-1 transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={onShowPasswordToggle}
          >
            {showPassword ? <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
        {capsLock && (
          <p className="mt-1 text-xs text-yellow-500 flex items-center gap-1">
            ⚠️ {isArabic ? 'Caps Lock مفعّل' : 'Caps Lock is ON'}
          </p>
        )}
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 transition-all duration-200 ${
              rememberMe ? 'bg-[#C7AB6C] border-[#C7AB6C]' : 'border-gray-300 group-hover:border-[#C7AB6C]'
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

        <Link href="/pages/forgot-password" className="text-xs sm:text-sm text-[#C7AB6C] hover:text-[#96753C] transition-colors">
          {t('login.forgotPassword')}
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-[#C6A96D] cursor-pointer hover:bg-[#96753C] text-black font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            {t('login.loggingIn')}
          </span>
        ) : t('login.loginButton')}
      </button>
    </form>
  );
}
