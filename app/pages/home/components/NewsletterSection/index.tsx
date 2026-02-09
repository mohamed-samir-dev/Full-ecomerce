'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';

export default function NewsletterSection() {
  const { t, isArabic } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError(t('home.newsletter.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('home.newsletter.emailInvalid'));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-linear-to-r from-orange-50 to-amber-50" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          {t('home.newsletter.title')}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
          {t('home.newsletter.description')}
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletter.placeholder')}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 text-black border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-sm sm:text-base"
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-sm sm:text-base"
            >
              {loading ? t('home.newsletter.subscribing') : t('home.newsletter.subscribe')}
            </button>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm bg-red-50 px-3 sm:px-4 py-2.5 rounded-lg border border-red-100">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 text-green-700 text-xs sm:text-sm bg-green-50 px-3 sm:px-4 py-2.5 rounded-lg border border-green-100">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('home.newsletter.success')}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
