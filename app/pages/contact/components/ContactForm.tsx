'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlineSubject } from 'react-icons/md';
import { IoSendOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbMessageCircle } from 'react-icons/tb';

interface ContactFormProps {
  formData: { name: string; email: string; subject: string; message: string };
  setFormData: (data: { name: string; email: string; subject: string; message: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

function FloatingInput({
  id, type = 'text', label, placeholder, value, onChange, icon: Icon, required, isDarkMode, isArabic,
}: {
  id: string; type?: string; label: string; placeholder: string; value: string;
  onChange: (v: string) => void; icon: React.ElementType; required?: boolean;
  isDarkMode: boolean; isArabic: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      {/* Icon */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 transition-colors duration-200 ${isArabic ? 'right-3.5' : 'left-3.5'}`}
        style={{ color: active ? '#C9A84C' : isDarkMode ? '#ffffff40' : '#9ca3af' }}
      >
        <Icon size={15} />
      </div>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        required={required}
        className={`w-full pt-5 pb-2 text-sm rounded-xl border-2 transition-all duration-200 focus:outline-none ${
          isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'
        } ${
          isDarkMode
            ? `text-white placeholder:text-white/30 ${active ? 'border-[#C9A84C]' : 'border-white/10'}`
            : `text-gray-900 placeholder:text-gray-400 ${active ? 'border-[#C9A84C]' : 'border-gray-200'}`
        }`}
        style={{ background: isDarkMode ? '#252A31' : '#F9FAFB' }}
      />

      <label
        htmlFor={id}
        className={`absolute transition-all duration-200 pointer-events-none font-semibold ${
          isArabic ? 'right-10' : 'left-10'
        } ${active ? 'top-[7px] text-[9px] sm:text-[10px] tracking-wider uppercase' : 'top-1/2 -translate-y-1/2 text-xs sm:text-sm'}`}
        style={{ color: active ? '#C9A84C' : isDarkMode ? '#ffffff40' : '#9ca3af' }}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactForm({ formData, setFormData, handleSubmit, isSubmitting }: ContactFormProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [msgFocused, setMsgFocused] = useState(false);
  const maxChars = 500;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}
      style={{ border: '1px solid', borderColor: isDarkMode ? '#C9A84C15' : '#C9A84C20' }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Gradient header */}
      <div
        className="relative px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <TbMessageCircle size={18} color="#fff" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black text-white">{t('contact.form.title')}</h2>
            <p className="text-[11px] sm:text-xs text-white/70 mt-0.5">{t('contact.form.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Form body */}
      <form id="contact-form" onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-3 sm:space-y-4">

        {/* Name + Email — stacked on mobile, side by side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FloatingInput
            id="name"
            label={t('contact.form.fullName')}
            placeholder={t('contact.form.fullNamePlaceholder')}
            value={formData.name}
            onChange={(v) => setFormData({ ...formData, name: v })}
            icon={BsPerson}
            required
            isDarkMode={isDarkMode}
            isArabic={isArabic}
          />
          <FloatingInput
            id="email"
            type="email"
            label={t('contact.form.email')}
            placeholder={t('contact.form.emailPlaceholder')}
            value={formData.email}
            onChange={(v) => setFormData({ ...formData, email: v })}
            icon={HiOutlineMail}
            required
            isDarkMode={isDarkMode}
            isArabic={isArabic}
          />
        </div>

        {/* Subject */}
        <FloatingInput
          id="subject"
          label={t('contact.form.subject')}
          placeholder={t('contact.form.subjectPlaceholder')}
          value={formData.subject}
          onChange={(v) => setFormData({ ...formData, subject: v })}
          icon={MdOutlineSubject}
          required
          isDarkMode={isDarkMode}
          isArabic={isArabic}
        />

        {/* Message */}
        <div className="relative">
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, maxChars) })}
            onFocus={() => setMsgFocused(true)}
            onBlur={() => setMsgFocused(false)}
            rows={4}
            placeholder={t('contact.form.messagePlaceholder')}
            required
            className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-200 resize-none pb-7 ${
              isDarkMode
                ? `bg-[#252A31] text-white placeholder:text-white/30 ${msgFocused ? 'border-[#C9A84C]' : 'border-white/10'}`
                : `bg-gray-50 text-gray-900 placeholder:text-gray-400 ${msgFocused ? 'border-[#C9A84C]' : 'border-gray-200'}`
            }`}
          />
          {/* Character counter */}
          <span
            className={`absolute bottom-2.5 ${isArabic ? 'left-3' : 'right-3'} text-[10px] font-medium`}
            style={{ color: formData.message.length > maxChars * 0.9 ? '#C9A84C' : isDarkMode ? '#ffffff25' : '#d1d5db' }}
          >
            {formData.message.length}/{maxChars}
          </span>
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          form="contact-form"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          {isSubmitting ? (
            <><AiOutlineLoading3Quarters size={15} className="animate-spin" />{t('contact.form.sending')}</>
          ) : (
            <><IoSendOutline size={15} />{t('contact.form.sendButton')}</>
          )}
        </motion.button>

        {/* Privacy note */}
        <p className={`text-center text-[10px] sm:text-[11px] ${isDarkMode ? 'text-white/25' : 'text-gray-400'}`}>
          {t('contact.form.privacyNote')}
        </p>
      </form>
    </motion.div>
  );
}
