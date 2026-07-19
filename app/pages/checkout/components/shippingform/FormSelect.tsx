import { FormSelectProps } from '../../types/checkout';

export default function FormSelect({
  label, required = false, value, onChange, options, placeholder = 'Select an option', isDarkMode
}: FormSelectProps) {
  const isObjectArray = options.length > 0 && typeof options[0] === 'object';

  return (
    <div>
      <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label} {required && <span style={{ color: '#C9A84C' }}>*</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 ${
          isDarkMode
            ? 'bg-[#191C21] border-white/10 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <option value="">{placeholder}</option>
        {isObjectArray
          ? (options as Array<{ key: string; label: string }>).map(o => (
              <option key={o.key} value={o.label}>{o.label}</option>
            ))
          : (options as string[]).map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
      </select>
    </div>
  );
}
