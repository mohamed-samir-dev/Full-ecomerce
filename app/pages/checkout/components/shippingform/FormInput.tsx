import { FormInputProps } from '../../types/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function FormInput({
  label, type = 'text', required = false, value, onChange,
  placeholder, icon, helperText, pattern, maxLength, onKeyPress, inputMode, isDarkMode
}: FormInputProps) {
  const { isArabic } = useTranslation();
  return (
    <div>
      <label className={`flex items-center gap-1.5 text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
        {icon}
        {label} {required && <span style={{ color: '#C9A84C' }}>*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        inputMode={inputMode}
        dir={isArabic ? 'rtl' : 'ltr'}
        className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 ${
          isDarkMode
            ? 'bg-[#191C21] border-white/10 text-white placeholder-gray-500'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
        } ${isArabic ? 'text-right' : ''}`}
      />
      {helperText && <p className={`text-xs mt-1.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${isArabic ? 'text-right' : ''}`}>{helperText}</p>}
    </div>
  );
}
