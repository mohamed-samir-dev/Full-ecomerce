'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

export default function ForgotPasswordPage() {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(isArabic ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase().trim() }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || (isArabic ? 'حدث خطأ، حاول مجدداً' : 'Something went wrong'));
      }
    } catch {
      setError(isArabic ? 'حدث خطأ، حاول مجدداً' : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0D0F12]' : 'bg-gray-50'
    }`}>
      <div className="w-full max-w-md">
        <div className={`p-8 rounded-lg shadow-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-[#191C21]' : 'bg-white'
        }`}>
          <h1 className={`text-2xl font-sans text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('forgotPassword.title')}
          </h1>
          <p className={`text-sm text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('forgotPassword.subtitle')}
          </p>

          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('forgotPassword.successMessage')}
              </p>
              <Link
                href="/pages/login"
                className="inline-block mt-2 text-sm text-[#C7AB6C] hover:text-[#96753C] transition-colors"
              >
                {t('forgotPassword.backToLogin')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder={t('login.email')}
                  className={`w-full px-4 py-3 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C7AB6C] focus:border-transparent transition-colors ${
                    isDarkMode ? 'bg-[#0D0F12] text-white placeholder-gray-400 border-gray-700' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
                  } ${error ? 'border-red-500' : ''}`}
                  autoComplete="email"
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-sm bg-[#C6A96D] hover:bg-[#96753C] text-black font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('forgotPassword.sending') : t('forgotPassword.sendButton')}
              </button>

              <div className="text-center">
                <Link
                  href="/pages/login"
                  className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t('forgotPassword.backToLogin')}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
