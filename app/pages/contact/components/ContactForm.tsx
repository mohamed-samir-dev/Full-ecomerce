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
      <div
        className={`absolute top-1/2 -translate-y-1/2 transition-colors duration-200 ${isArabic ? 'right-4' : 'left-4'}`}
        style={{ color: active ? '#C9A84C' : isDarkMode ? '#ffffff40' : '#9ca3af' }}
      >
        <Icon size={16} />
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
        className={`peer w-full pt-5 pb-2 text-sm rounded-xl border-2 transition-all duration-200 focus:outline-none bg-transparent ${
          isArabic ? 'pr-11 pl-4' : 'pl-11 pr-4'
        } ${
          isDarkMode
            ? `bg-[#252A31] text-white placeholder:text-white/30 ${active ? 'border-[#C9A84C]' : 'border-white/10'}`
            : `bg-gray-50 text-gray-900 placeholder:text-gray-400 ${active ? 'border-[#C9A84C]' : 'border-gray-200'}`
        }`}
        style={{ background: isDarkMode ? '#252A31' : '#F9FAFB' }}
      />
      <label
        htmlFor={id}
        className={`absolute transition-all duration-200 pointer-events-none font-semibold ${
          isArabic ? 'right-11' : 'left-11'
        } ${
          active
            ? 'top-2 text-[10px] tracking-wider uppercase'
            : 'top-1/2 -translate-y-1/2 text-sm'
        } ${
          active ? '' : isDarkMode ? 'text-white/40' : 'text-gray-400'
        }`}
        style={{ color: active ? '#C9A84C' : undefined }}
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
      className={`rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}
      style={{ border: '1px solid', borderColor: isDarkMode ? '#C9A84C15' : '#C9A84C20' }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Gradient header */}
      <div className="relative px-6 sm:px-8 lg:px-10 pt-8 pb-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <TbMessageCircle size={20} color="#fff" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{t('contact.form.title')}</h2>
            <p className="text-xs text-white/70 mt-0.5">{t('contact.form.subtitle')}</p>
          </div>
        </div>
      </div>

      <form id="contact-form" onSubmit={handleSubmit} className="px-6 sm:px-8 lg:px-10 py-7 space-y-4">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput
            id="name" label={t('contact.form.fullName')} placeholder={t('contact.form.fullNamePlaceholder')}
            value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })}
            icon={BsPerson} required isDarkMode={isDarkMode} isArabic={isArabic}
          />
          <FloatingInput
            id="email" type="email" label={t('contact.form.email')} placeholder={t('contact.form.emailPlaceholder')}
            value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })}
            icon={HiOutlineMail} required isDarkMode={isDarkMode} isArabic={isArabic}
          />
        </div>

        {/* Subject */}
        <FloatingInput
          id="subject" label={t('contact.form.subject')} placeholder={t('contact.form.subjectPlaceholder')}
          value={formData.subject} onChange={(v) => setFormData({ ...formData, subject: v })}
          icon={MdOutlineSubject} required isDarkMode={isDarkMode} isArabic={isArabic}
        />

        {/* Message with character counter */}
        <div className="relative">
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, maxChars) })}
            onFocus={() => setMsgFocused(true)}
            onBlur={() => setMsgFocused(false)}
            rows={5}
            placeholder={t('contact.form.messagePlaceholder')}
            required
            className={`w-full px-4 py-4 text-sm rounded-xl border-2 focus:outline-none transition-all duration-200 resize-none ${
              isDarkMode
                ? `bg-[#252A31] text-white placeholder:text-white/30 ${msgFocused ? 'border-[#C9A84C]' : 'border-white/10'}`
                : `bg-gray-50 text-gray-900 placeholder:text-gray-400 ${msgFocused ? 'border-[#C9A84C]' : 'border-gray-200'}`
            }`}
          />
          {/* Character counter */}
          <div className={`absolute bottom-3 ${isArabic ? 'left-3' : 'right-3'} flex items-center gap-1`}>
            <span className="text-[10px] font-medium" style={{ color: formData.message.length > maxChars * 0.9 ? '#C9A84C' : isDarkMode ? '#ffffff30' : '#d1d5db' }}>
              {formData.message.length}/{maxChars}
            </span>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          form="contact-form"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          {isSubmitting ? (
            <><AiOutlineLoading3Quarters size={16} className="animate-spin" />{t('contact.form.sending')}</>
          ) : (
            <><IoSendOutline size={16} />{t('contact.form.sendButton')}</>
          )}
        </motion.button>

        {/* Privacy note */}
        <p className={`text-center text-[11px] ${isDarkMode ? 'text-white/25' : 'text-gray-400'}`}>
          {t('contact.form.privacyNote')}
        </p>
      </form>
    </motion.div>
  );
}
