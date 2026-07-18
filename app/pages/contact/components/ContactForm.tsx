'use client';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { MdOutlineEmail, MdOutlineSubject } from 'react-icons/md';
import { BsPerson, BsChatLeftText } from 'react-icons/bs';
import { IoSendOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ContactFormProps {
  formData: { name: string; email: string; subject: string; message: string };
  setFormData: (data: { name: string; email: string; subject: string; message: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function ContactForm({ formData, setFormData, handleSubmit, isSubmitting }: ContactFormProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();

  const inputClass = `w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-200 ${
    isDarkMode
      ? 'bg-[#252A31] text-white border-white/10 focus:border-[#C9A84C] placeholder:text-white/30'
      : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-[#C9A84C] placeholder:text-gray-400'
  }`;

  const iconClass = `absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-3.5' : 'left-3.5'}`;

  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(to right, #8B6914, #C9A84C, #8B6914)' }} />

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
            <BsChatLeftText size={18} color="#fff" />
          </div>
          <div>
            <h2 className={`text-xl sm:text-2xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.form.title')}
            </h2>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
              {t('contact.form.subtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block mb-1.5 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                {t('contact.form.fullName')}
              </label>
              <div className="relative">
                <BsPerson size={16} className={iconClass} style={{ color: '#C9A84C' }} />
                <input
                  type="text"
                  placeholder={t('contact.form.fullNamePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  style={isArabic ? { paddingRight: '2.75rem', paddingLeft: '1rem' } : {}}
                  required
                />
              </div>
            </div>
            <div>
              <label className={`block mb-1.5 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                {t('contact.form.email')}
              </label>
              <div className="relative">
                <MdOutlineEmail size={16} className={iconClass} style={{ color: '#C9A84C' }} />
                <input
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  style={isArabic ? { paddingRight: '2.75rem', paddingLeft: '1rem' } : {}}
                  required
                />
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className={`block mb-1.5 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
              {t('contact.form.subject')}
            </label>
            <div className="relative">
              <MdOutlineSubject size={16} className={iconClass} style={{ color: '#C9A84C' }} />
              <input
                type="text"
                placeholder={t('contact.form.subjectPlaceholder')}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={inputClass}
                style={isArabic ? { paddingRight: '2.75rem', paddingLeft: '1rem' } : {}}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={`block mb-1.5 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
              {t('contact.form.message')}
            </label>
            <textarea
              placeholder={t('contact.form.messagePlaceholder')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className={`w-full px-4 py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-200 resize-none ${
                isDarkMode
                  ? 'bg-[#252A31] text-white border-white/10 focus:border-[#C9A84C] placeholder:text-white/30'
                  : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-[#C9A84C] placeholder:text-gray-400'
              }`}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters size={16} className="animate-spin" />
                {t('contact.form.sending')}
              </>
            ) : (
              <>
                <IoSendOutline size={16} />
                {t('contact.form.sendButton')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
